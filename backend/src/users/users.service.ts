import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  public async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
