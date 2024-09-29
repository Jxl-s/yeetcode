import { IsEnum, IsString } from 'class-validator';
import { getLanguageArr } from 'src/languages/languages.service';

export class CreateSubmitDto {
    @IsString()
    code: string;

    @IsString()
    @IsEnum(getLanguageArr())
    language: ReturnType<typeof getLanguageArr>[number];

    @IsString()
    question_id: string;
}
