import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('用户管理')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async getCurrentUser(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息（仅限本人）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  @ApiResponse({ status: 403, description: '无权访问其他用户信息' })
  async getUser(@Request() req: any, @Param('id') id: string) {
    // 只允许用户查看自己的信息
    if (req.user.id !== id) {
      throw new ForbiddenException('无权访问其他用户信息');
    }
    return this.usersService.findById(id);
  }

  @Put('me')
  @ApiOperation({ summary: '更新当前用户信息' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async updateCurrentUser(
    @Request() req: any,
    @Body()
    body: {
      displayName?: string;
      avatarUrl?: string;
      language?: string;
      preferredLangs?: string;
      settings?: string;
    },
  ) {
    return this.usersService.update(req.user.id, body);
  }

  @Get('me/progress')
  @ApiOperation({ summary: '获取我的学习进度' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async getMyProgress(@Request() req: any) {
    return this.usersService.getProgress(req.user.id);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: '获取用户学习进度（仅限本人）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  @ApiResponse({ status: 403, description: '无权访问其他用户进度' })
  async getUserProgress(@Request() req: any, @Param('id') id: string) {
    if (req.user.id !== id) {
      throw new ForbiddenException('无权访问其他用户进度');
    }
    return this.usersService.getProgress(id);
  }
}
