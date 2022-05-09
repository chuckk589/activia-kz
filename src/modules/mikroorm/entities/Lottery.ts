import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { LotteryStatus } from './LotteryStatus';
import { Prize } from './Prize';
import { Locale } from './User';
import { Winner } from './Winner';
import { DateTime } from 'luxon';

@Entity()
export class Lottery extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  start!: Date;

  @Property()
  end!: Date;

  @Property()
  primaryWinners!: number;

  @Property()
  reserveWinners!: number;

  @ManyToOne(() => LotteryStatus)
  status!: LotteryStatus;

  @ManyToOne(() => Prize)
  prize!: Prize;

  @OneToMany(() => Winner, (winner) => winner.lottery)
  winners = new Collection<Winner>(this);
  //TODO: automatic status on create
}
export class BotLotteryDto {
  constructor(lottery: Lottery, locale: Locale) {
    this.week = DateTime.fromJSDate(lottery.end).weekNumber;
    this.prize = lottery.prize.translation.getLocalizedLabel(locale);
    this.winners = lottery.winners
      .toArray()
      .map((winner) => ({ phone: winner.check.user.phone.slice(0, -6) + 'XXXX' + winner.check.user.phone.slice(-2) }));
  }
  week: number;
  prize: string;
  winners: { phone: string }[];
}
