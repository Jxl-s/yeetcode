import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
    imports: [LanguagesModule],
    providers: [ProblemsService],
    controllers: [ProblemsController],
})
export class ProblemsModule {}
