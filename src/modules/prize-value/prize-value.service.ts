import { EntityManager } from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrizeValue } from '../mikroorm/entities/PrizeValue';
import { RetrievePrizeValueDto } from './dto/retrieve-prize-value.dto';

@Injectable()
export class PrizeValueService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<RetrievePrizeValueDto[]> {
    const values = await this.em.find(PrizeValue, {}, { populate: ['prize.translation.values'] });
    return values.map((value) => new RetrievePrizeValueDto(value));
  }

  async remove(id: number) {
    const prizeValue = await this.em.findOne(PrizeValue, { id }, { populate: ['winners'] });
    if (prizeValue.winners.length === 0) {
      await this.em.removeAndFlush(prizeValue);
    } else {
      throw new HttpException(
        `PrizeValue with id ${id} has ${prizeValue.winners.length} assosiated winners and can't be removed`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
