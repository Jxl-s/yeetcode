import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('submissions')
export class SubmissionsController {
    constructor(private readonly submissionsService: SubmissionsService) {}

    @Get('/:submission_id')
    @UseGuards(JwtGuard)
    async getSubmission(
        @GetUser('id') userId: number,
        @Param('submission_id', ParseIntPipe) submissionId: number,
    ) {
        return this.submissionsService.getSubmission(submissionId, userId);
    }
}
