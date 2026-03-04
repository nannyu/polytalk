import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user || !user.passwordHash) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
      },
    };
  }

  async register(data: {
    username: string;
    password: string;
    email?: string;
    displayName?: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (existingUser) {
      throw new UnauthorizedException('用户名已存在');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash,
        displayName: data.displayName || data.username,
      },
    });

    const { passwordHash: _, ...result } = user;
    return result;
  }
}
