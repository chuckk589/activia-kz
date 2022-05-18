import { Entity, PrimaryKey, Property, ManyToOne, OneToOne, Collection, OneToMany } from '@mikro-orm/core';
import { Prize } from './Prize';
import { Winner } from './Winner';

@Entity()
export class PrizeValue {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255, nullable: true })
  qr_payload!: string;

  @ManyToOne(() => Prize)
  prize!: Prize;

  @OneToMany(() => Winner, (winner) => winner.prize_value)
  winners = new Collection<Winner>(this);
}
