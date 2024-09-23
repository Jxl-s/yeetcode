import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { ConfigModule } from '@nestjs/config';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
    providers: [SubmissionsService],
    controllers: [SubmissionsController],
    imports: [ConfigModule, LanguagesModule],
})
export class SubmissionsModule {}
