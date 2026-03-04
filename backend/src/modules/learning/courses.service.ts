import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(language?: string, level?: string) {
    return this.prisma.course.findMany({
      where: {
        isPublished: true,
        ...(language ? { language } : {}),
        ...(level ? { level } : {}),
      },
      include: {
        units: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        units: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
        vocabs: true,
      },
    });

    if (!course) {
      throw new NotFoundException('课程不存在');
    }

    return course;
  }

  async create(data: {
    title: string;
    description?: string;
    language: string;
    level?: string;
    category?: string;
  }) {
    return this.prisma.course.create({
      data: {
        ...data,
        level: data.level || 'beginner',
      },
    });
  }
}
