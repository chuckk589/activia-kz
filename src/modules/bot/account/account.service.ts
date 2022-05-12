import { EntityDTO, EntityManager, UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { Locale, User } from 'src/modules/mikroorm/entities/User';
import { BotContext } from 'src/types/interfaces';
import axios from 'axios';
import fs from 'fs';
import { Check } from 'src/modules/mikroorm/entities/Check';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { checkMessage, prizeMessage } from '../common/helpers';
import { Winner } from 'src/modules/mikroorm/entities/Winner';
import { CheckState } from 'src/modules/mikroorm/entities/CheckStatus';
import { BotLotteryDto, Lottery } from 'src/modules/mikroorm/entities/Lottery';
import { LotteryState } from 'src/modules/mikroorm/entities/LotteryStatus';

@Injectable()
export class AccountService {
  constructor(
    private readonly em: EntityManager,
    private readonly AppConfigService: AppConfigService,
    @InjectPinoLogger('AccountService') private readonly logger: PinoLogger,
  ) {}
  async getLotteries(ctx: BotContext): Promise<BotLotteryDto[]> {
    const lotteries = await this.em.find(
      Lottery,
      {
        winners: {
          confirmed: true,
          check: { status: { name: CheckState.APPROVED } },
        },
        status: { name: LotteryState.ENDED },
      },
      { populate: ['prize.translation', 'winners.check', 'winners.check.user'] },
    );
    return lotteries.map((l) => new BotLotteryDto(l, ctx.i18n.locale() as Locale));
  }
  async getUserLotteries(ctx: BotContext): Promise<Lottery[]> {
    const lotteries = await this.em.find(
      Lottery,
      {
        winners: {
          confirmed: true,
          check: { user: { chatId: String(ctx.from.id) }, status: { name: CheckState.APPROVED } },
        },
        status: { name: LotteryState.ENDED },
      },
      { populate: ['prize.translation', 'winners.check'] },
    );
    return lotteries;
  }
  async getUserChecks(ctx: BotContext): Promise<string> {
    const checks = await this.em.find(
      Check,
      { user: { chatId: String(ctx.from.id) } },
      { populate: ['status.comment', 'status.translation.values'] },
    );
    return checkMessage(ctx, checks);
  }
  async registerCheck(from: number, path: string): Promise<Check> {
    const user = await this.em.findOneOrFail(User, { chatId: String(from) });
    return await this.insertNewCheck(user, path);
  }
  async insertNewCheck(user: User, path: string): Promise<Check> {
    try {
      const check = new Check({ path });
      user.checks.add(check);
      await this.em.persistAndFlush(user);
      return check;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        this.logger.warn(`Failed to insert new check: ER_DUP_ENTRY ${user.chatId}`);
        return await this.insertNewCheck(user, path);
      }
    }
  }
  downloadFile(ctx: BotContext): Promise<string> {
    return new Promise((res, rej) => {
      ctx
        .getFile() //
        .then((file) => {
          const token = this.AppConfigService.get('BOT_TOKEN_PROD');
          axios({
            url: `http://api.telegram.org/file/bot${token}/${file.file_path}`,
            method: 'GET',
            responseType: 'stream',
          }).then((response) => {
            const uploaddir = `/files/${ctx.from.id}`;
            const filename = `${Date.now()}.${file.file_path.split('.').pop()}`;
            if (!fs.existsSync(`./dist/public${uploaddir}`)) {
              fs.mkdirSync(`./dist/public${uploaddir}`, { recursive: true });
            }
            const photo = fs.createWriteStream(`./dist/public${uploaddir}/${filename}`);
            response.data.pipe(photo).on('finish', function () {
              res(`${uploaddir}/${filename}`);
            });
          });
        });
    });
  }
  async isRegistered(ctx: BotContext): Promise<boolean> {
    if (ctx.session.isRegistered === undefined) {
      const user = await this.em.findOne(User, { chatId: String(ctx.from.id) });
      if (!user || !user.registered) return false;
      ctx.session.isRegistered = user.registered;
    }
    if (ctx.session.isRegistered) return true;
    return false;
  }
}
