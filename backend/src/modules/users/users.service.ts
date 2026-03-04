import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        role: true,
        language: true,
        preferredLangs: true,
        settings: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  async update(id: string, data: {
    displayName?: string;
    avatarUrl?: string;
    language?: string;
    preferredLangs?: string;
    settings?: string;
  }) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        role: true,
        language: true,
        preferredLangs: true,
        settings: true,
      },
    });
  }

  async getProgress(userId: string) {
    return this.prisma.userProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            unit: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });
  }
}
