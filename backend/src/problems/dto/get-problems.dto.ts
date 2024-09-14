import { Type } from 'class-transformer';
import { IsInt, Min, Max, IsString } from 'class-validator';

export class GetProblemsDto {
    @IsInt()
    @Type(() => Number)
    @Min(1)
    page: number = 1;

    @IsInt()
    @Type(() => Number)
    @Min(1)
    @Max(50)
    limit: number = 50;

    @IsString()
    q: string = '';
}
