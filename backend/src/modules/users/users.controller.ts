import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: {
      displayName?: string;
      avatarUrl?: string;
      language?: string;
      preferredLangs?: string;
      settings?: string;
    },
  ) {
    return this.usersService.update(id, body);
  }

  @Get(':id/progress')
  async getUserProgress(@Param('id') id: string) {
    return this.usersService.getProgress(id);
  }
}
