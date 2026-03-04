import { Module } from '@nestjs/common';
import { LearningController } from './learning.controller';
import { LearningService } from './learning.service';
import { CoursesService } from './courses.service';

@Module({
  controllers: [LearningController],
  providers: [LearningService, CoursesService],
  exports: [LearningService, CoursesService],
})
export class LearningModule {}
