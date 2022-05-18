import { Collection } from '@mikro-orm/core';
import { City } from './City';
import { Promo } from './Promo';
import { Check } from './Check';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare enum Locale {
    RU = "ru",
    UZ = "uz"
}
export declare enum UserGender {
    MALE = "male",
    FEMALE = "female"
}
export declare class User {
    id: number;
    chatId: string;
    username?: string;
    credentials?: string;
    password?: string;
    locale: Locale;
    role: UserRole;
    phone?: string;
    registered?: boolean;
    city?: City;
    promo?: Promo;
    checks: Collection<Check, unknown>;
    gender?: UserGender;
    createdAt: Date;
    updatedAt: Date;
    beforeCreate(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
    makePassword(): string;
}
