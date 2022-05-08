import { EntityManager, UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { User } from 'src/modules/mikroorm/entities/User';
import { BotContext } from 'src/types/interfaces';
import axios from 'axios';
import fs from 'fs';
import { Check } from 'src/modules/mikroorm/entities/Check';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { checkMessage } from '../common/helpers';

@Injectable()
export class AccountService {
  async getUserChecks(ctx: BotContext): Promise<string> {
    const checks = await this.em.find(
      Check,
      { user: { chatId: String(ctx.from.id) } },
      //FIXME: { populate: ['status.comment', 'status.translation'] },
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
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        this.logger.warn(`Failed to insert new check: ER_DUP_ENTRY ${user.chatId}`);
        return await this.insertNewCheck(user, path);
      }
    }
  }
  constructor(
    private readonly em: EntityManager,
    private readonly AppConfigService: AppConfigService,
    @InjectPinoLogger('AccountService') private readonly logger: PinoLogger,
  ) {}
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
            const uploaddir = `/public/files/${ctx.from.id}`;
            const filename = `${Date.now()}.${file.file_path.split('.').pop()}`;
            if (!fs.existsSync(`.${uploaddir}`)) {
              fs.mkdirSync(`.${uploaddir}`, { recursive: true });
            }
            const photo = fs.createWriteStream(`.${uploaddir}/${filename}`);
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
