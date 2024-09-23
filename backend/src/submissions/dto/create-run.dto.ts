import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { getLanguageArr } from 'src/languages/languages.service';

export class CreateRunDto {
    @IsString()
    code: string;

    @IsString()
    @IsEnum(getLanguageArr())
    language: ReturnType<typeof getLanguageArr>[number];

    @IsString()
    question_id: string;

    @IsNotEmpty()
    @IsArray()
    tests: Object[];
}
