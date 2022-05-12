import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { Config } from 'src/modules/mikroorm/entities/Config';

@Injectable()
export class TelegramService {
  constructor(private readonly em: EntityManager) {}
  async updateSessionString(newSessionString: string) {
    await this.em.nativeUpdate(Config, { name: 'APP_SESSION_STRING' }, { value: newSessionString });
  }
}
