import { Locale, UserRole } from 'src/modules/mikroorm/entities/User';
export declare class UpdateUserDto {
    city?: string;
    credentials?: string;
    locale?: Locale;
    phone?: string;
    role?: UserRole;
    registered?: number;
    promo?: string;
}
