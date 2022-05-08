import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { LotteryStatus } from './LotteryStatus';
import { Winner } from './Winner';

@Entity()
export class Lottery extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property({ length: 255, nullable: true })
  name: string;

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

  @OneToMany(() => Winner, (winner) => winner.lottery)
  winners = new Collection<Winner>(this);
}
