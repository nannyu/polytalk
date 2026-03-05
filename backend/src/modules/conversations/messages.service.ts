import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    conversationId: string;
    role: string;
    content: string;
    audioUrl?: string;
    audioDuration?: number;
    metadata?: string;
  }) {
    return this.prisma.message.create({
      data,
    });
  }

  async findByConversation(conversationId: string, limit = 50, before?: string) {
    const where: any = { conversationId };

    if (before) {
      const beforeMessage = await this.prisma.message.findUnique({
        where: { id: before },
        select: { createdAt: true },
      });
      if (beforeMessage) {
        where.createdAt = { lt: beforeMessage.createdAt };
      }
    }

    return this.prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getLatest(conversationId: string) {
    return this.prisma.message.findFirst({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
