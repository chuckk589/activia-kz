import { BeforeCreate, BeforeUpdate, Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { compare, hash } from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export enum UserLocale {
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
  firstName?: string;

  @Property({ length: 255, nullable: true })
  password?: string;

  @Enum({ items: () => UserLocale, default: UserLocale.RU })
  locale?: UserLocale;

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role?: UserRole;

  @Property()
  phone: string;

  @Property()
  gender: string;

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
    return true;
  }
}
