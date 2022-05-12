import { Module } from '@nestjs/common';
import { TelegramModule } from 'src/telegram/telegram.module';
import { globalComposer } from './global.composer';
import { globalService } from './global.service';

@Module({
  imports: [TelegramModule],
  providers: [globalService, globalComposer],
  exports: [globalComposer],
})
export class globalModule {}
