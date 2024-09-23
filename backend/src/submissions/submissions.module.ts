import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    providers: [SubmissionsService],
    controllers: [SubmissionsController],
    imports: [ConfigModule]
})
export class SubmissionsModule {}
