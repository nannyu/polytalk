Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# 脚本参数
param(
    [switch]$AutoReboot,
    [int]$RebootTimeoutSeconds = 30,
    [switch]$Resume
)

$script:LogFile = Join-Path -Path $PSScriptRoot -ChildPath ("install-openclaw-{0}.log" -f (Get-Date -Format "yyyyMMdd-HHmmss"))
$script:NeedsReboot = $false
$script:RebootReason = ""
$script:ResumeMarkerFile = Join-Path -Path $env:TEMP -ChildPath "openclaw-install-resume.marker"
$script:ProgressFile = Join-Path -Path $env:TEMP -ChildPath "openclaw-install-progress.json"

function Register-ResumeAfterReboot {
    <#
    .SYNOPSIS
    注册重启后自动恢复脚本的计划任务
    #>
    
    $scriptPath = $PSCommandPath
    $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`" -Resume"
    $trigger = New-ScheduledTaskTrigger -AtLogon
    $principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
    
    Register-ScheduledTask -TaskName "OpenClaw-Install-Resume" -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Force | Out-Null
    
    Write-Log -Message "Registered scheduled task to resume installation after reboot." -Level "SUCCESS"
}

function Unregister-ResumeTask {
    <#
    .SYNOPSIS
    移除恢复安装的计划任务
    #>
    
    try {
        Unregister-ScheduledTask -TaskName "OpenClaw-Install-Resume" -Confirm:$false -ErrorAction SilentlyContinue
        Write-Log -Message "Removed resume scheduled task." -Level "INFO"
    }
    catch {
        # Task may not exist
    }
}

function Write-Log {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,

        [ValidateSet("INFO", "WARN", "ERROR", "SUCCESS")]
        [string]$Level = "INFO"
    )

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[{0}] [{1}] {2}" -f $timestamp, $Level, $Message

    switch ($Level) {
        "WARN" { Write-Host $line -ForegroundColor Yellow }
        "ERROR" { Write-Host $line -ForegroundColor Red }
        "SUCCESS" { Write-Host $line -ForegroundColor Green }
        default { Write-Host $line }
    }

    Add-Content -Path $script:LogFile -Value $line
}

function Fail {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,

        [System.Exception]$Exception
    )

    Write-Log -Message $Message -Level "ERROR"
    if ($Exception) {
        Write-Log -Message ("Exception: {0}" -f $Exception.Message) -Level "ERROR"
    }

    throw $Message
}

function Invoke-Step {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,

        [Parameter(Mandatory = $true)]
        [scriptblock]$Action
    )

    Write-Log -Message ("Starting: {0}" -f $Name)
    try {
        & $Action
        Write-Log -Message ("Completed: {0}" -f $Name) -Level "SUCCESS"
    }
    catch {
        Fail -Message ("Failed: {0}" -f $Name) -Exception $_.Exception
    }
}

function Test-IsAdmin {
    $currentIdentity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentIdentity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-OsSupport {
    $os = Get-CimInstance -ClassName Win32_OperatingSystem
    $version = [Version]$os.Version
    $build = [int]$os.BuildNumber

    $supported = $false
    $reason = ""

    if ($version.Major -eq 10 -and $build -ge 18362) {
        $supported = $true
    }
    else {
        $reason = "Windows 10 build 18362 (1903) or later is required."
    }

    [pscustomobject]@{
        Caption = $os.Caption
        Version = $os.Version
        Build = $build
        Supported = $supported
        Reason = $reason
    }
}

function Get-VirtualizationStatus {
    $cs = Get-CimInstance -ClassName Win32_ComputerSystem
    $cpu = Get-CimInstance -ClassName Win32_Processor | Select-Object -First 1

    $hypervisorCapable = $false
    try {
        $optionalFeature = Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -ErrorAction SilentlyContinue
        if ($optionalFeature -and $optionalFeature.State -ne "Disabled") {
            $hypervisorCapable = $true
        }
        elseif ($cs.HypervisorPresent) {
            $hypervisorCapable = $true
        }
        elseif ($cpu.SecondLevelAddressTranslationExtensions -and $cpu.VirtualizationFirmwareEnabled) {
            $hypervisorCapable = $true
        }
    }
    catch {
        if ($cs.HypervisorPresent) {
            $hypervisorCapable = $true
        }
    }

    [pscustomobject]@{
        VirtualizationFirmwareEnabled = [bool]$cpu.VirtualizationFirmwareEnabled
        SecondLevelAddressTranslationExtensions = [bool]$cpu.SecondLevelAddressTranslationExtensions
        VMMonitorModeExtensions = [bool]$cpu.VMMonitorModeExtensions
        HypervisorCapable = $hypervisorCapable
    }
}

function Get-FeatureState {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FeatureName
    )

    try {
        $feature = Get-WindowsOptionalFeature -Online -FeatureName $FeatureName
        return $feature.State
    }
    catch {
        return "Unknown"
    }
}

function Enable-FeatureIfNeeded {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FeatureName
    )

    $state = Get-FeatureState -FeatureName $FeatureName
    Write-Log -Message ("Feature {0} state: {1}" -f $FeatureName, $state)

    if ($state -eq "Enabled") {
        return
    }

    if ($state -eq "EnablePending") {
        $script:NeedsReboot = $true
        $script:RebootReason = "Windows feature {0} is pending enablement." -f $FeatureName
        Write-Log -Message ("Feature {0} is pending enablement and may require a reboot." -f $FeatureName) -Level "WARN"
        return
    }

    Write-Log -Message ("Enabling Windows feature: {0}" -f $FeatureName)
    
    # 如果启用自动重启，则不使用 -NoRestart 参数
    if ($AutoReboot) {
        Write-Log -Message ("AutoReboot enabled: feature installation may trigger immediate reboot." -f $FeatureName) -Level "WARN"
        $result = Enable-WindowsOptionalFeature -Online -FeatureName $FeatureName -All
    } else {
        $result = Enable-WindowsOptionalFeature -Online -FeatureName $FeatureName -All -NoRestart
    }

    if ($result.RestartNeeded) {
        $script:NeedsReboot = $true
        $script:RebootReason = "Windows feature {0} enabled but requires reboot." -f $FeatureName
        Write-Log -Message ("Feature {0} enabled but a reboot is required." -f $FeatureName) -Level "WARN"
    }
}

function Get-WslStatus {
    $wslExe = Get-Command wsl.exe -ErrorAction SilentlyContinue
    $installed = $null -ne $wslExe
    $kernelVersion = $null
    $defaultVersion = $null
    $ubuntuPresent = $false
    $ubuntuRunningVersion = $null
    $listOutput = ""
    $versionOutput = ""

    if ($installed) {
        try {
            $versionOutput = & wsl.exe --version 2>&1 | Out-String
            $kernelMatch = [regex]::Match($versionOutput, "Kernel version:\s*([^\r\n]+)")
            if ($kernelMatch.Success) {
                $kernelVersion = $kernelMatch.Groups[1].Value.Trim()
            }
        }
        catch {
            Write-Log -Message "wsl.exe is present but --version is unavailable on this build." -Level "WARN"
        }

        try {
            $listOutput = & wsl.exe --list --verbose 2>&1 | Out-String

            if ($listOutput -match "Ubuntu") {
                $ubuntuPresent = $true
                foreach ($line in ($listOutput -split "`r?`n")) {
                    if ($line -match "Ubuntu") {
                        $versionMatch = [regex]::Match($line, "\s([12])\s*$")
                        if ($versionMatch.Success) {
                            $ubuntuRunningVersion = [int]$versionMatch.Groups[1].Value
                        }
                    }
                }
            }
        }
        catch {
            Write-Log -Message "Unable to query WSL distro list yet." -Level "WARN"
        }

        try {
            $defaultVersionOutput = & wsl.exe --status 2>&1 | Out-String
            $defaultMatch = [regex]::Match($defaultVersionOutput, "Default Version:\s*([12])")
            if ($defaultMatch.Success) {
                $defaultVersion = [int]$defaultMatch.Groups[1].Value
            }
        }
        catch {
            Write-Log -Message "Unable to read WSL default version from wsl --status." -Level "WARN"
        }
    }

    [pscustomobject]@{
        Installed = $installed
        KernelVersion = $kernelVersion
        DefaultVersion = $defaultVersion
        UbuntuPresent = $ubuntuPresent
        UbuntuVersion = $ubuntuRunningVersion
        RawListOutput = $listOutput
        RawVersionOutput = $versionOutput
    }
}

function Get-WslCapability {
    $vmPlatformState = Get-FeatureState -FeatureName "VirtualMachinePlatform"
    $wslFeatureState = Get-FeatureState -FeatureName "Microsoft-Windows-Subsystem-Linux"
    $status = Get-WslStatus

    $wsl2Supported = $false

    if ($wslFeatureState -in @("Enabled", "EnablePending") -and $vmPlatformState -in @("Enabled", "EnablePending")) {
        $wsl2Supported = $true
    }

    if ($status.KernelVersion) {
        $wsl2Supported = $true
    }

    [pscustomobject]@{
        WslInstalled = $status.Installed
        Wsl2Supported = $wsl2Supported
        KernelVersion = $status.KernelVersion
        VMPlatformState = $vmPlatformState
        WslFeatureState = $wslFeatureState
        DefaultVersion = $status.DefaultVersion
        UbuntuPresent = $status.UbuntuPresent
        UbuntuVersion = $status.UbuntuVersion
    }
}

function Install-WslKernelIfNeeded {
    $status = Get-WslStatus
    if ($status.KernelVersion) {
        Write-Log -Message ("WSL kernel version detected: {0}" -f $status.KernelVersion)
        return
    }

    $kernelUri = "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi"
    $kernelInstaller = Join-Path -Path $env:TEMP -ChildPath "wsl_update_x64.msi"

    Write-Log -Message ("Downloading WSL2 kernel update from {0}" -f $kernelUri)
    Invoke-WebRequest -Uri $kernelUri -OutFile $kernelInstaller

    Write-Log -Message "Installing WSL2 kernel update package"
    $process = Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$kernelInstaller`" /qn /norestart" -Wait -PassThru
    if ($process.ExitCode -ne 0) {
        Fail -Message ("WSL kernel update installation failed with exit code {0}." -f $process.ExitCode)
    }
}

function Ensure-WslSupport {
    $capability = Get-WslCapability

    Write-Log -Message ("WSL optional feature state: {0}" -f $capability.WslFeatureState)
    Write-Log -Message ("VirtualMachinePlatform state: {0}" -f $capability.VMPlatformState)

    if (-not $capability.Wsl2Supported) {
        Write-Log -Message "WSL2 is not currently supported. Attempting repair steps." -Level "WARN"
        Enable-FeatureIfNeeded -FeatureName "Microsoft-Windows-Subsystem-Linux"
        Enable-FeatureIfNeeded -FeatureName "VirtualMachinePlatform"
        Install-WslKernelIfNeeded
        $capability = Get-WslCapability
    }

    if ($capability.Wsl2Supported) {
        Write-Log -Message "WSL2 support is available." -Level "SUCCESS"
        return $capability
    }

    Fail -Message "WSL2 is not supported on this machine after attempted repair. OpenClaw requires WSL2."
}

function Install-WslAndUbuntu {
    $status = Get-WslStatus

    if (-not $status.Installed) {
        Write-Log -Message "WSL is not installed. Running wsl --install -d Ubuntu."
        $installOutput = & wsl.exe --install -d Ubuntu 2>&1 | Out-String
        Write-Log -Message $installOutput.Trim()
        $script:NeedsReboot = $true
        return
    }

    if (-not $status.UbuntuPresent) {
        Write-Log -Message "Ubuntu is not installed. Installing Ubuntu distro."
        $ubuntuInstallOutput = & wsl.exe --install -d Ubuntu 2>&1 | Out-String
        Write-Log -Message $ubuntuInstallOutput.Trim()
        $script:NeedsReboot = $true
        return
    }

    Write-Log -Message "Ubuntu distro is already present."
}

function Ensure-UbuntuWsl2 {
    $status = Get-WslStatus

    if (-not $status.UbuntuPresent) {
        Fail -Message "Ubuntu distro is not available yet. Complete the WSL install and rerun the script."
    }

    if ($status.UbuntuVersion -eq 2) {
        Write-Log -Message "Ubuntu is already running on WSL2."
    }
    elseif ($status.UbuntuVersion -eq 1) {
        Write-Log -Message "Ubuntu is on WSL1. Upgrading to WSL2."
        & wsl.exe --set-version Ubuntu 2
    }
    else {
        Write-Log -Message "Ubuntu version could not be determined. Attempting to set WSL2 explicitly." -Level "WARN"
        & wsl.exe --set-version Ubuntu 2
    }

    Write-Log -Message "Setting WSL default version to 2."
    & wsl.exe --set-default-version 2

    Write-Log -Message "Setting default distro to Ubuntu."
    & wsl.exe --set-default Ubuntu
}

function Invoke-WslBash {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Command
    )

    Write-Log -Message ("Running inside Ubuntu: {0}" -f $Command)
    & wsl.exe -d Ubuntu -- bash -lc $Command
    if ($LASTEXITCODE -ne 0) {
        Fail -Message ("WSL command failed with exit code {0}: {1}" -f $LASTEXITCODE, $Command)
    }
}

function Install-NodeToolchain {
    Invoke-WslBash -Command "export DEBIAN_FRONTEND=noninteractive && sudo apt-get update"
    Invoke-WslBash -Command "export DEBIAN_FRONTEND=noninteractive && sudo apt-get install -y curl ca-certificates build-essential"

    Invoke-WslBash -Command "if [ ! -d ""$HOME/.nvm"" ]; then curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash; fi"
    Invoke-WslBash -Command "export NVM_DIR=""$HOME/.nvm"" && . ""$NVM_DIR/nvm.sh"" && nvm install 22 && nvm alias default 22 && nvm use 22"
    Invoke-WslBash -Command "export NVM_DIR=""$HOME/.nvm"" && . ""$NVM_DIR/nvm.sh"" && npm install -g pnpm"
}

function Install-OpenClaw {
    Invoke-WslBash -Command "export NVM_DIR=""$HOME/.nvm"" && . ""$NVM_DIR/nvm.sh"" && pnpm add -g openclaw"
    Invoke-WslBash -Command "export NVM_DIR=""$HOME/.nvm"" && . ""$NVM_DIR/nvm.sh"" && export PATH=""$HOME/.local/share/pnpm:$PATH"" && openclaw init"
}

Invoke-Step -Name "Administrator privilege check" -Action {
    if (-not (Test-IsAdmin)) {
        Fail -Message "This script must be run from an elevated PowerShell session."
    }
}

Invoke-Step -Name "Windows version validation" -Action {
    $osSupport = Get-OsSupport
    Write-Log -Message ("Detected OS: {0} ({1}, build {2})" -f $osSupport.Caption, $osSupport.Version, $osSupport.Build)
    if (-not $osSupport.Supported) {
        Fail -Message $osSupport.Reason
    }
}

Invoke-Step -Name "Virtualization capability validation" -Action {
    $virt = Get-VirtualizationStatus
    Write-Log -Message ("VT-x/AMD-V enabled in firmware: {0}" -f $virt.VirtualizationFirmwareEnabled)
    Write-Log -Message ("SLAT available: {0}" -f $virt.SecondLevelAddressTranslationExtensions)
    Write-Log -Message ("VM monitor mode extensions: {0}" -f $virt.VMMonitorModeExtensions)
    Write-Log -Message ("Hyper-V capable: {0}" -f $virt.HypervisorCapable)

    if (-not $virt.VirtualizationFirmwareEnabled) {
        Fail -Message "Hardware virtualization is disabled. Enable VT-x/AMD-V in BIOS/UEFI and rerun."
    }

    if (-not $virt.SecondLevelAddressTranslationExtensions) {
        Fail -Message "CPU does not expose SLAT, which is required for WSL2."
    }

    if (-not $virt.HypervisorCapable) {
        Fail -Message "System is not Hyper-V capable enough for WSL2."
    }
}

$capability = $null
Invoke-Step -Name "WSL capability detection and repair" -Action {
    $capability = Ensure-WslSupport
}

Invoke-Step -Name "WSL2 requirement validation" -Action {
    if (-not $capability.Wsl2Supported) {
        Fail -Message "OpenClaw deployment requires WSL2. This machine only supports WSL1 after repair attempts."
    }
}

Invoke-Step -Name "WSL and Ubuntu installation" -Action {
    Install-WslAndUbuntu
}

if ($script:NeedsReboot) {
    Write-Log -Message "A reboot is required before continuing." -Level "WARN"
    Write-Log -Message ("Reboot reason: {0}" -f $script:RebootReason) -Level "WARN"
    
    # 注册恢复任务
    if ($AutoReboot) {
        try {
            Register-ResumeAfterReboot
            Write-Log -Message "Registered resume task to continue after reboot." -Level "SUCCESS"
        }
        catch {
            Write-Log -Message ("Failed to register resume task: {0}" -f $_.Exception.Message) -Level "WARN"
        }
    }
    
    if ($AutoReboot) {
        Write-Log -Message ("AutoReboot enabled. System will restart in {0} seconds..." -f $RebootTimeoutSeconds) -Level "WARN"
        Write-Host ""
        Write-Host "=============================================" -ForegroundColor Yellow
        Write-Host ("  系统将在 {0} 秒后自动重启..." -f $RebootTimeoutSeconds) -ForegroundColor Yellow
        Write-Host "  重启后将自动继续安装 OpenClaw" -ForegroundColor Yellow
        Write-Host "  按 Ctrl+C 取消重启" -ForegroundColor Yellow
        Write-Host "=============================================" -ForegroundColor Yellow
        Write-Host ""
        
        # 倒计时
        for ($i = $RebootTimeoutSeconds; $i -gt 0; $i--) {
            Write-Host "`r重启倒计时: $i 秒  " -NoNewline -ForegroundColor Yellow
            Start-Sleep -Seconds 1
        }
        Write-Host ""
        
        Write-Log -Message "Initiating system reboot..." -Level "WARN"
        Restart-Computer -Force
    } else {
        Write-Host ""
        Write-Host "=============================================" -ForegroundColor Yellow
        Write-Host "  需要重启 Windows 以继续安装" -ForegroundColor Yellow
        Write-Host "  请手动重启后重新运行此脚本" -ForegroundColor Yellow
        Write-Host "  或使用 -AutoReboot 参数自动重启并恢复安装" -ForegroundColor Yellow
        Write-Host "  示例: .\install-openclaw.ps1 -AutoReboot" -ForegroundColor Cyan
        Write-Host "=============================================" -ForegroundColor Yellow
        Write-Host ""
    }
    exit 0
}

Invoke-Step -Name "Ubuntu WSL2 configuration" -Action {
    Ensure-UbuntuWsl2
}

Invoke-Step -Name "Node.js toolchain installation in Ubuntu" -Action {
    Install-NodeToolchain
}

Invoke-Step -Name "OpenClaw CLI installation" -Action {
    Install-OpenClaw
}

Write-Log -Message ("OpenClaw deployment completed successfully. Log file: {0}" -f $script:LogFile) -Level "SUCCESS"

# ============ 安装进度跟踪 ============

function Get-InstallProgress {
    if (Test-Path $script:ProgressFile) {
        $progress = Get-Content $script:ProgressFile | ConvertFrom-Json
        return $progress
    }
    return @{
        AdminCheck = $false
        OsCheck = $false
        VirtualizationCheck = $false
        WslInstalled = $false
        UbuntuInstalled = $false
        NodeInstalled = $false
        OpenClawInstalled = $false
    }
}

function Set-InstallProgress {
    param(
        [string]$Step,
        [bool]$Completed = $true
    )
    
    $progress = Get-InstallProgress
    $progress.$Step = $Completed
    $progress | ConvertTo-Json | Set-Content $script:ProgressFile
    Write-Log -Message ("Progress saved: {0} = {1}" -f $Step, $Completed) -Level "INFO"
}

function Clear-InstallProgress {
    if (Test-Path $script:ProgressFile) {
        Remove-Item $script:ProgressFile -Force
    }
}
