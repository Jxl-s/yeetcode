import { Controller, Get, Query } from '@nestjs/common';
import { GetProblemsDto } from './dto';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
    constructor(private readonly problemsService: ProblemsService) {}

    @Get('/')
    async getProblems(@Query() dto: GetProblemsDto) {
        return this.problemsService.getProblems(dto);
    }
}
