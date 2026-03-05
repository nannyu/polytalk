import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LearningService {
  constructor(private prisma: PrismaService) {}

  async getCourseProgress(userId: string, courseId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        unit: { courseId },
      },
      include: {
        progress: {
          where: { userId },
        },
      },
    });

    const total = lessons.length;
    const completed = lessons.filter(
      (l) => l.progress.length > 0 && l.progress[0].completed,
    ).length;

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  async getUserCourses(userId: string) {
    // 获取用户有进度的课程
    const progress = await this.prisma.userProgress.findMany({
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

    // 按课程分组
    const courseMap = new Map();
    for (const p of progress) {
      const course = p.lesson.unit.course;
      if (!courseMap.has(course.id)) {
        courseMap.set(course.id, {
          ...course,
          lessonsCompleted: 0,
          lastAccessed: p.lastAccessed,
        });
      }
      const courseData = courseMap.get(course.id);
      if (p.completed) {
        courseData.lessonsCompleted++;
      }
      if (p.lastAccessed > courseData.lastAccessed) {
        courseData.lastAccessed = p.lastAccessed;
      }
    }

    return Array.from(courseMap.values());
  }

  async getLessonProgress(userId: string, lessonId: string) {
    return this.prisma.userProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });
  }

  async updateProgress(
    userId: string,
    lessonId: string,
    data: { completed?: boolean; score?: number; timeSpent?: number },
  ) {
    const existing = await this.prisma.userProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });

    if (existing) {
      return this.prisma.userProgress.update({
        where: { userId_lessonId: { userId, lessonId } },
        data: {
          ...data,
          lastAccessed: new Date(),
          attempts: { increment: 1 },
          ...(data.completed ? { completedAt: new Date() } : {}),
        },
      });
    }

    return this.prisma.userProgress.create({
      data: {
        userId,
        lessonId,
        ...data,
        lastAccessed: new Date(),
      },
    });
  }
}
