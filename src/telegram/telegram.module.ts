import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService, TelegramController],
  exports: [TelegramController],
})
export class TelegramModule {}
