import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LearningService } from './learning.service';
import { CoursesService } from './courses.service';

@Controller('learning')
export class LearningController {
  constructor(
    private learningService: LearningService,
    private coursesService: CoursesService,
  ) {}

  @Get('courses')
  async getCourses() {
    return this.coursesService.findAll();
  }

  @Get('courses/:id')
  async getCourse(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Get('courses/:id/progress')
  async getCourseProgress(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    return this.learningService.getCourseProgress(userId, id);
  }

  @Post('progress')
  async updateProgress(
    @Body() body: { userId: string; lessonId: string; completed?: boolean; score?: number; timeSpent?: number },
  ) {
    return this.learningService.updateProgress(
      body.userId,
      body.lessonId,
      {
        completed: body.completed,
        score: body.score,
        timeSpent: body.timeSpent,
      },
    );
  }
}
