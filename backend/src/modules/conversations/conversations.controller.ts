import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('对话管理')
@Controller('conversations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConversationsController {
  constructor(
    private conversationsService: ConversationsService,
    private messagesService: MessagesService,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建新对话' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async create(
    @Request() req: any,
    @Body() body: { courseId?: string; lessonId?: string; title?: string },
  ) {
    return this.conversationsService.create(req.user.id, body);
  }

  @Get()
  @ApiOperation({ summary: '获取我的对话列表' })
  @ApiQuery({ name: 'status', required: false, description: '对话状态筛选' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  async findMyConversations(
    @Request() req: any,
    @Query('status') status?: string,
  ) {
    return this.conversationsService.findByUser(req.user.id, status);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取对话详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  @ApiResponse({ status: 404, description: '对话不存在' })
  async findById(@Request() req: any, @Param('id') id: string) {
    return this.conversationsService.findById(id, req.user.id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: '更新对话状态' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  @ApiResponse({ status: 404, description: '对话不存在' })
  async updateStatus(
    @Request() req: any,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.conversationsService.updateStatus(id, req.user.id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除对话（软删除）' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  @ApiResponse({ status: 404, description: '对话不存在' })
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.conversationsService.delete(id, req.user.id);
  }

  // ==================== 消息相关 ====================

  @Get(':id/messages')
  @ApiOperation({ summary: '获取对话消息列表' })
  @ApiQuery({ name: 'limit', required: false, description: '消息数量限制' })
  @ApiQuery({ name: 'before', required: false, description: '分页游标（消息ID）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  @ApiResponse({ status: 404, description: '对话不存在' })
  async getMessages(
    @Request() req: any,
    @Param('id') id: string,
    @Query('limit') limit?: string,
    @Query('before') before?: string,
  ) {
    // 先验证对话属于当前用户
    await this.conversationsService.findById(id, req.user.id);

    const messages = await this.messagesService.findByConversation(
      id,
      limit ? Number(limit) : 50,
      before,
    );

    // 按时间正序返回
    return messages.reverse();
  }

  @Post(':id/messages')
  @ApiOperation({ summary: '发送消息并获取AI回复' })
  @ApiResponse({ status: 201, description: '发送成功' })
  @ApiResponse({ status: 401, description: '未登录' })
  @ApiResponse({ status: 404, description: '对话不存在' })
  async sendMessage(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { content: string; audioUrl?: string },
  ) {
    // 先验证对话属于当前用户
    await this.conversationsService.findById(id, req.user.id);

    // 保存用户消息
    const userMessage = await this.messagesService.create({
      conversationId: id,
      role: 'user',
      content: body.content,
      audioUrl: body.audioUrl,
    });

    // TODO: 调用 AI 服务生成回复
    // 这里暂时返回模拟回复
    const assistantMessage = await this.messagesService.create({
      conversationId: id,
      role: 'assistant',
      content: `[AI 回复] 收到你的消息：${body.content}`,
    });

    return {
      userMessage,
      assistantMessage,
    };
  }
}
