import { EntityManager } from '@mikro-orm/core';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Bot, InputFile } from 'grammy';
import { BOT_NAME } from 'src/constants';
import { BotContext } from 'src/types/interfaces';
import i18n from '../bot/middleware/i18n';
import { Winner } from '../mikroorm/entities/Winner';
import { UpdateWinnerDto } from './dto/update-winner.dto';
import bwipjs from 'bwip-js';

@Injectable()
export class WinnerService {
  async sendNotification(id: number) {
    const winner = await this.em.findOneOrFail(
      Winner,
      { id },
      { populate: ['check.user', 'lottery.prize', 'prize_value'] },
    );
    const message = i18n.t(winner.check.user.locale, winner.lottery.prize.name, { check_id: winner.check.fancyId });
    const barCode = await bwipjs.toBuffer({
      bcid: 'qrcode', // Barcode type
      text: winner.prize_value.qr_payload, // Text to encode
    });
    //await this.bot.api.sendMessage(winner.check.user.chatId, message);
    await this.bot.api.sendPhoto(winner.check.user.chatId, new InputFile(barCode), {
      caption: message,
    });
    await this.em.nativeUpdate(Winner, { id }, { notified: true });
  }
  constructor(private readonly em: EntityManager, @Inject(BOT_NAME) private bot: Bot<BotContext>) {}
  async update(id: number, updateWinnerDto: UpdateWinnerDto) {
    return await this.em.nativeUpdate(Winner, { id }, { confirmed: updateWinnerDto.confirmed });
  }
}
