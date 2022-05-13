import { EntityManager } from '@mikro-orm/mysql';
import { Inject, Injectable } from '@nestjs/common';
import { Bot } from 'grammy';
import { BOT_NAME } from 'src/constants';
import { BotContext } from 'src/types/interfaces';
import i18n from '../bot/middleware/i18n';
import { Check } from '../mikroorm/entities/Check';
import { CheckState, CheckStatus } from '../mikroorm/entities/CheckStatus';
import { RetrieveCheckDto } from './dto/retrieve-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';

@Injectable()
export class CheckService {
  constructor(private readonly em: EntityManager, @Inject(BOT_NAME) private bot: Bot<BotContext>) {}

  async findAll(): Promise<RetrieveCheckDto[]> {
    return (
      await this.em.find(
        Check,
        {},
        { populate: ['user.city.translation.values', 'status.translation.values', 'status.comment.values'] },
      )
    ).map((check) => new RetrieveCheckDto(check));
  }

  async update(id: number, updateCheckDto: UpdateCheckDto) {
    const check = await this.em.findOneOrFail(Check, { id }, { populate: ['user'] });
    const check_status = await this.em.findOneOrFail(
      CheckStatus,
      { id: Number(updateCheckDto.status) },
      { populate: ['comment', 'translation'] },
    );
    let message = '';
    if (check_status.name == CheckState.REJECTED) {
      message = i18n.t(check.user.locale, check_status.comment.name, { check_id: check.fancyId });
    } else if (check_status.name == CheckState.APPROVED) {
      message = i18n.t(check.user.locale, check_status.translation.name, { check_id: check.fancyId });
    } else {
      return;
    }
    check.status = check_status;
    await this.em.persistAndFlush(check);
    return await this.bot.api.sendMessage(check.user.chatId, message);
  }
}
