import { EntityManager } from '@mikro-orm/core';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Bot, InputFile } from 'grammy';
import { BOT_NAME } from 'src/constants';
import { BotContext } from 'src/types/interfaces';
import i18n from '../bot/middleware/i18n';
import { Winner } from '../mikroorm/entities/Winner';
import { UpdateWinnerDto } from './dto/update-winner.dto';
import bwipjs from 'bwip-js';

@Injectable()
export class WinnerService {
  constructor(private readonly em: EntityManager, @Inject(BOT_NAME) private bot: Bot<BotContext>) {}
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
      paddingheight: 8,
      paddingwidth: 8,
    });
    //await this.bot.api.sendMessage(winner.check.user.chatId, message);
    if (winner.lottery.prize.name !== 'PRIZE_MAIN') {
      await this.bot.api.sendPhoto(winner.check.user.chatId, new InputFile(barCode), {
        caption: message,
      });
    } else {
      await this.bot.api.sendMessage(winner.check.user.chatId, message);
    }
    await this.em.nativeUpdate(Winner, { id }, { notified: true });
  }
  async update(id: number, updateWinnerDto: UpdateWinnerDto) {
    if (updateWinnerDto.confirmed) {
      const pendingWinner = await this.em.findOne(Winner, { id: id }, { populate: ['prize_value'] });
      const existingWinner = await this.em.findOne(
        Winner,
        {
          prize_value: {
            id: pendingWinner.prize_value.id,
          },
          confirmed: true,
        },
        { populate: ['check.user'] },
      );
      if (existingWinner) {
        throw new HttpException(`Confirmed winner associated with this prize already exists`, HttpStatus.BAD_REQUEST);
      } else {
        pendingWinner.confirmed = true;
        return await this.em.persistAndFlush(pendingWinner);
      }
    } else {
      return await this.em.nativeUpdate(Winner, { id }, { confirmed: updateWinnerDto.confirmed });
    }
  }
}
