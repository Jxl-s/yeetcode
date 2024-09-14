import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, ProblemsModule, TagsModule],
  controllers: [AppController],
})
export class AppModule {}
