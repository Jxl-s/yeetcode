import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetProblemsDto } from './dto';
import { ProblemsService } from './problems.service';

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
}
