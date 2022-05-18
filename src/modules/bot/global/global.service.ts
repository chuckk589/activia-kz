import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { City } from 'src/modules/mikroorm/entities/City';
import { Config } from 'src/modules/mikroorm/entities/Config';
import { Promo } from 'src/modules/mikroorm/entities/Promo';
import { Locale, User, UserRole } from 'src/modules/mikroorm/entities/User';
import { BotContext } from 'src/types/interfaces';
import { TelegramController } from 'src/telegram/telegram.controller';

@Injectable()
export class globalService {
  async updatePassword(from: number) {
    const user = await this.em.findOne(User, { chatId: String(from) });
    const newpass = user.makePassword();
    await this.em.persistAndFlush(user);
    return newpass;
  }
  async getUserChatIds(): Promise<string[]> {
    const users = await this.em.find(User, {});
    return users.map((user) => user.chatId);
  }
  async singleForward(message_id: number, fromPeer: string | number, toPeer: string | number) {
    await this.TelegramController.forwardMessage(message_id, fromPeer, toPeer);
  }
  async checkAdminCode(from: number, text: string): Promise<boolean> {
    const config = await this.em.findOne(Config, { name: 'ADMIN_PASSCODE' });
    if (config.value === text) {
      await this.updateUser(from, { role: UserRole.ADMIN });
      return true;
    } else {
      return false;
    }
  }
  async checkUserRole(from: number): Promise<boolean> {
    try {
      const user = await this.em.findOneOrFail(User, { chatId: String(from) });
      return user.role == UserRole.ADMIN;
    } catch (error) {
      return false;
    }
  }
  async updatePromo(from: number, id: number) {
    await this.em.nativeUpdate(
      User,
      { chatId: String(from) },
      {
        promo: this.em.getReference(Promo, id),
      },
    );
  }
  async updateCity(from: number, id: number) {
    await this.em.nativeUpdate(
      User,
      { chatId: String(from) },
      {
        city: this.em.getReference(City, id),
      },
    );
  }
  async updateUser(from: number, options: Partial<User>) {
    await this.em.nativeUpdate(User, { chatId: String(from) }, options);
  }
  constructor(private readonly em: EntityManager, private readonly TelegramController: TelegramController) {}
  async getUser(ctx: BotContext) {
    let user = await this.em.findOne(User, { chatId: String(ctx.from.id) });
    if (!user) {
      user = this.em.create(User, {
        chatId: String(ctx.from.id),
        username: ctx.from.username,
      });
      await this.em.persistAndFlush(user);
    }
    return wrap(user).toPOJO();
  }
}
