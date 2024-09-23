import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateRunDto } from './dto';

@Controller('submissions')
export class SubmissionsController {
    constructor(private readonly submissionsService: SubmissionsService) {}

    @Get('/:submission_id')
    @UseGuards(JwtGuard)
    async getSubmission(
        @GetUser('id') userId: number,
        @Param('submission_id') submissionId: string,
    ) {
        return this.submissionsService.getSubmission(submissionId, userId);
    }

    @Post('/run')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    async createSubmissionRun(
        @GetUser('id') userId: number,
        @Body() dto: CreateRunDto,
    ) {
        return this.submissionsService.createRun(dto, userId);
    }
}
