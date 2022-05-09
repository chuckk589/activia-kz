import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CheckStatus } from '../mikroorm/entities/CheckStatus';
import { City } from '../mikroorm/entities/City';
import { LotteryStatus } from '../mikroorm/entities/LotteryStatus';
import { Promo } from '../mikroorm/entities/Promo';
import { Locale, UserRole } from '../mikroorm/entities/User';
import { RetrieveStatusDto } from './dto/retrieve-status.dto';

@Injectable()
export class StatusService {
  constructor(private readonly em: EntityManager) {}
  async findAll(): Promise<Record<string, RetrieveStatusDto[]>> {
    const cities = await this.em.find(City, {}, { populate: ['translation.values'] });
    const promos = await this.em.find(Promo, {}, { populate: ['translation.values'] });
    const check_s = await this.em.find(CheckStatus, {}, { populate: ['translation.values', 'comment.values'] });
    const lottery_s = await this.em.find(LotteryStatus, {}, { populate: ['translation.values'] });
    return {
      cities: cities.map((city) => new RetrieveStatusDto(city)),
      promotions: promos.map((promo) => new RetrieveStatusDto(promo)),
      check_statuses: check_s.map((check_s) => new RetrieveStatusDto(check_s)),
      lottery_statuses: lottery_s.map((lottery_s) => new RetrieveStatusDto(lottery_s)),
      locales: Object.values(Locale).map(
        (locale) => new RetrieveStatusDto({ value: locale, label: locale == 'ru' ? 'Русский' : 'Узбекский' }),
      ),
      roles: Object.values(UserRole).map(
        (role) => new RetrieveStatusDto({ value: role, label: role == 'user' ? 'Пользователь' : 'Администратор' }),
      ),
    };
  }
}