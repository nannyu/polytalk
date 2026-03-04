import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { LearningModule } from './modules/learning/learning.module';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),

    // 数据库模块
    PrismaModule,

    // 业务模块
    AuthModule,
    UsersModule,
    ConversationsModule,
    LearningModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
