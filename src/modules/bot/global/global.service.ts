import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { UserLocale, User } from 'src/modules/mikroorm/entities/User';
import { BotContext } from 'src/types/interfaces';

@Injectable()
export class globalService {
  async updateUser(from: number, options: Partial<User>) {
    await this.em.nativeUpdate(User, { chatId: String(from) }, options);
  }
  constructor(private readonly em: EntityManager) {}
  async getUser(ctx: BotContext) {
    let user = await this.em.findOne(User, { chatId: String(ctx.from.id) });
    if (!user) {
      user = this.em.create(User, {
        chatId: String(ctx.from.id),
        username: ctx.from.username,
        firstName: String(ctx.from.first_name),
      });
      await this.em.persistAndFlush(user);
    }
    return wrap(user).toPOJO();
  }
}
