import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { compare, hash } from 'bcrypt';
import { City } from './City';
import { Promo } from './Promo';
import { Check } from './Check';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export enum Locale {
  RU = 'ru',
  UZ = 'uz',
}
export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property({ length: 255, nullable: true })
  chatId!: string;

  @Unique()
  @Property({ length: 255, nullable: true })
  username?: string;

  @Property({ length: 255, nullable: true })
  credentials?: string;

  @Property({ length: 255, nullable: true })
  password?: string;

  @Enum({ items: () => Locale, default: Locale.RU })
  locale: Locale;

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role: UserRole;

  @Property({ nullable: true })
  phone?: string;

  @Property({ default: false })
  registered?: boolean;

  @ManyToOne(() => City, { nullable: true })
  city?: City;

  @ManyToOne(() => Promo, { nullable: true })
  promo?: Promo;

  @OneToMany(() => Check, (check) => check.user)
  checks = new Collection<Check>(this);

  @Enum({ items: () => UserGender, nullable: true })
  gender?: UserGender;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @BeforeUpdate()
  @BeforeCreate()
  async beforeCreate(): Promise<void> {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
  async comparePassword(password: string): Promise<boolean> {
    if (this.password) {
      return await compare(password, this.password);
    }
    return false;
  }

  makePassword(): string {
    const newPassword = Math.random().toString(36).substring(2, 15);
    this.password = newPassword;
    return newPassword;
  }
}
