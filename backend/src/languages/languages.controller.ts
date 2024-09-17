import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
    constructor(private readonly languagesService: LanguagesService) {}

    @Get('/')
    getLanguages() {
        return this.languagesService.getLanguages();
    }
}
