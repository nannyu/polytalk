import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(conversationId: string, data: {
    role: string;
    content: string;
    audioUrl?: string;
    audioDuration?: number;
    metadata?: string;
  }) {
    return this.prisma.message.create({
      data: {
        conversationId,
        ...data,
      },
    });
  }

  async findByConversation(conversationId: string, limit = 50, offset = 0) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: limit,
      skip: offset,
    });
  }
}
