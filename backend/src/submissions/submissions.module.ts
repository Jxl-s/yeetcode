import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';

@Module({
    providers: [SubmissionsService],
    controllers: [SubmissionsController],
})
export class SubmissionsModule {}
