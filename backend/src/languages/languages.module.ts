import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Module({
  providers: [LanguagesService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
