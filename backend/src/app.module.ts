import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProblemsController } from './problems/problems.controller';
import { ProblemsService } from './problems/problems.service';
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, ProblemsModule],
  controllers: [AppController, ProblemsController],
  providers: [AppService, ProblemsService],
})
export class AppModule {}
