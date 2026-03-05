import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { courseId?: string; lessonId?: string; title?: string }) {
    return this.prisma.conversation.create({
      data: {
        userId,
        courseId: data.courseId,
        lessonId: data.lessonId,
        title: data.title,
      },
      include: {
        course: {
          select: { id: true, title: true, language: true },
        },
      },
    });
  }

  async findByUser(userId: string, status?: string) {
    return this.prisma.conversation.findMany({
      where: {
        userId,
        status: status || 'active',
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        course: {
          select: { id: true, title: true, language: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findById(id: string, userId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id, userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        course: true,
        lesson: true,
      },
    });

    if (!conversation) {
      throw new NotFoundException('对话不存在');
    }

    return conversation;
  }

  async updateStatus(id: string, userId: string, status: string) {
    // 先验证对话属于用户
    await this.findById(id, userId);

    return this.prisma.conversation.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string, userId: string) {
    // 先验证对话属于用户
    await this.findById(id, userId);

    // 软删除（更新状态为 deleted）
    return this.prisma.conversation.update({
      where: { id },
      data: { status: 'deleted' },
    });
  }

  async updateContext(id: string, userId: string, context: string) {
    // 先验证对话属于用户
    await this.findById(id, userId);

    return this.prisma.conversation.update({
      where: { id },
      data: { context },
    });
  }
}
