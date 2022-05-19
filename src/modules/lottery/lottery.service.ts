import { EntityManager, wrap } from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { getRandomArrayValues } from '../bot/common/helpers';
import { Check } from '../mikroorm/entities/Check';
import { CheckState } from '../mikroorm/entities/CheckStatus';
import { Lottery } from '../mikroorm/entities/Lottery';
import { LotteryStatus } from '../mikroorm/entities/LotteryStatus';
import { Prize } from '../mikroorm/entities/Prize';
import { PrizeValue } from '../mikroorm/entities/PrizeValue';
import { Winner } from '../mikroorm/entities/Winner';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { RetrieveLotteryDto } from './dto/retrieve-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';

@Injectable()
export class LotteryService {
  constructor(private readonly em: EntityManager) {}
  async create(createLotteryDto: CreateLotteryDto): Promise<RetrieveLotteryDto> {
    const requestedPrize = await this.em.findOne(Prize, { id: Number(createLotteryDto.prize) });
    const where = {
      ...(requestedPrize.name == 'PRIZE_WEEKLY'
        ? {
            createdAt: {
              $gte: createLotteryDto.start,
              $lt: createLotteryDto.end,
            },
            winners: { $eq: null },
          }
        : {}),
    };
    const checks = await this.em.find(
      Check,
      {
        ...where,
        status: { name: CheckState.APPROVED },
      },
      { populate: ['winners'] },
    );
    // for (let index = 0; index < 20; index++) {
    //   await this.em.nativeInsert(PrizeValue, {
    //     qr_payload: Math.random().toString(36).substring(2, 15),
    //     prize: this.em.getReference(Prize, 1),
    //   });
    // }
    const avaiblePrizes = await this.em.find(
      PrizeValue,
      { winners: { $eq: null }, prize: requestedPrize },
      { populate: ['winners', 'prize'] },
    );

    if (avaiblePrizes.length < Number(createLotteryDto.primaryWinners)) {
      throw new HttpException(
        `Not enough prizes of requested type ${requestedPrize.name}, \nRequested ${Number(
          createLotteryDto.primaryWinners,
        )}, \nAvailable: ${avaiblePrizes.length}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const totalWinners = Number(createLotteryDto.primaryWinners) + Number(createLotteryDto.reserveWinners);
    if (checks.length < totalWinners) {
      throw new HttpException(
        `Not enough checks, \nRequested ${totalWinners}, \nAvailable: ${checks.length}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const winners = getRandomArrayValues(checks, totalWinners);
    const lottery = this.em.create(Lottery, {
      primaryWinners: Number(createLotteryDto.primaryWinners),
      reserveWinners: Number(createLotteryDto.reserveWinners),
      prize: requestedPrize,
      end: createLotteryDto.end,
      start: createLotteryDto.start,
      winners: winners.map((winner, index) =>
        this.em.create(Winner, {
          check: this.em.getReference(Check, winner.id),
          primary: index < Number(createLotteryDto.primaryWinners),
          prize_value: avaiblePrizes[0],
        }),
      ),
    });
    await this.em.persistAndFlush(lottery);
    await wrap(lottery).init(true, [
      'status.translation.values',
      'prize.translation.values',
      'winners.check.user.city.translation.values',
    ]);
    return new RetrieveLotteryDto(lottery);
  }

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
