import { Collection, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { TranslationValue } from './TranslationValue';
import { Locale, User } from './User';

@Entity()
export class Translation {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property({ length: 255 })
  name!: string;

  @OneToMany(() => TranslationValue, (TranslationValue) => TranslationValue.translation)
  values = new Collection<TranslationValue>(this);
}
