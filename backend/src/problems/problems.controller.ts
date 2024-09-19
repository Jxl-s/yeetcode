import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetProblemsDto } from './dto';
import { ProblemsService } from './problems.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('problems')
export class ProblemsController {
    constructor(private readonly problemsService: ProblemsService) {}

    @Get('/')
    async getProblems(@Query() dto: GetProblemsDto) {
        return this.problemsService.getProblems(dto);
    }

    @Get('/:id')
    async getProblem(@Param('id') id: string) {
        return this.problemsService.getProblem(id);
    }

    @Get('/:problem_id/submissions')
    @UseGuards(JwtGuard)
    async getSubmissions(
        @Param('problem_id') problemId: string,
        @GetUser('id') userId: number,
    ) {
        return this.problemsService.getSubmissions(problemId, userId);
    }
}
