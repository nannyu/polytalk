import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: 'testuser', minLength: 3, maxLength: 20 })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: '密码', example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ description: '邮箱', example: 'test@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: '显示名称', example: 'Test User', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  displayName?: string;
}
