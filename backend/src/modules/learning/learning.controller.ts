import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LearningService } from './learning.service';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@ApiTags('学习中心')
@Controller('learning')
@UseGuards(JwtAuthGuard)
export class LearningController {
  constructor(
    private learningService: LearningService,
    private coursesService: CoursesService,
  ) {}

  // ==================== 课程相关 ====================

  @Public()
  @Get('courses')
  @ApiOperation({ summary: '获取课程列表（公开）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getCourses() {
    return this.coursesService.findAll();
  }

  @Public()
  @Get('courses/:id')
  @ApiOperation({ summary: '获取课程详情（公开）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 404, description: '课程不存在' })
  async getCourse(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Get('courses/:id/progress')
  @ApiOperation({ summary: '获取课程学习进度' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async getCourseProgress(@Request() req: any, @Param('id') id: string) {
    return this.learningService.getCourseProgress(req.user.id, id);
  }

  @Get('my-courses')
  @ApiOperation({ summary: '获取我正在学习的课程' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async getMyCourses(@Request() req: any) {
    return this.learningService.getUserCourses(req.user.id);
  }

  // ==================== 学习进度 ====================

  @Post('progress')
  @ApiOperation({ summary: '更新学习进度' })
  @ApiResponse({ status: 201, description: '更新成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async updateProgress(
    @Request() req: any,
    @Body() body: { lessonId: string; completed?: boolean; score?: number; timeSpent?: number },
  ) {
    return this.learningService.updateProgress(req.user.id, body.lessonId, {
      completed: body.completed,
      score: body.score,
      timeSpent: body.timeSpent,
    });
  }

  @Get('progress/:lessonId')
  @ApiOperation({ summary: '获取课时学习进度' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async getLessonProgress(@Request() req: any, @Param('lessonId') lessonId: string) {
    return this.learningService.getLessonProgress(req.user.id, lessonId);
  }
}
