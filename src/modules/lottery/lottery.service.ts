import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Lottery } from '../mikroorm/entities/Lottery';
import { LotteryStatus } from '../mikroorm/entities/LotteryStatus';
import { RetrieveLotteryDto } from './dto/retrieve-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';

@Injectable()
export class LotteryService {
  constructor(private readonly em: EntityManager) {
    // this.em
    //   .find(Lottery, {}, { populate: ['status.translation.values', 'prize.translation.values'] })
    //   .then((users) => console.log(users));
  }
  // create(createLotteryDto: CreateLotteryDto) {
  //   return 'This action adds a new lottery';
  // }

  async findAll(): Promise<RetrieveLotteryDto[]> {
    return (
      await this.em.find(
        Lottery,
        {},
        {
          populate: [
            'status.translation.values',
            'prize.translation.values',
            'winners.check.user.city.translation.values',
          ],
        },
      )
    ).map((lottery) => new RetrieveLotteryDto(lottery));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} lottery`;
  // }

  async update(id: number, updateLotteryDto: UpdateLotteryDto) {
    return await this.em.nativeUpdate(
      Lottery,
      { id },
      {
        status: this.em.getReference(LotteryStatus, Number(updateLotteryDto.status)),
      },
    );
  }

  async remove(id: number) {
    const lottery = await this.em.find(Lottery, { id }, { populate: ['winners'] });
    await this.em.removeAndFlush(lottery);
  }
}
