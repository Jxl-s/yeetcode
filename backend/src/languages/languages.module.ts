import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Module({
  providers: [LanguagesService]
})
export class LanguagesModule {}
