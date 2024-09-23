import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRunDto {
    @IsString()
    code: string;

    @IsString()
    language: string;

    @IsString()
    question_id: string;

    @IsNotEmpty()
    @IsArray()
    tests: Object[];
}
