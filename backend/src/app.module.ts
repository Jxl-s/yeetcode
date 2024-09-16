import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
    imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, ProblemsModule, LanguagesModule],
    controllers: [AppController],
})
export class AppModule {}
