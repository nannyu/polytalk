import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Post()
  async create(
    @Body('userId') userId: string,
    @Body() body: { courseId?: string; lessonId?: string; title?: string },
  ) {
    return this.conversationsService.create(userId, body);
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
    @Query('status') status?: string,
  ) {
    return this.conversationsService.findByUser(userId, status);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Body('userId') userId: string) {
    return this.conversationsService.findById(id, userId);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('status') status: string,
  ) {
    return this.conversationsService.updateStatus(id, userId, status);
  }
}
