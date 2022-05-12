import { User } from 'src/modules/mikroorm/entities/User';
export declare class RetrieveUserDto {
    constructor(user: User);
    id: number;
    chatId: string;
    username: string;
    credentials: string;
    locale: string;
    role: string;
    phone: string;
    registered: boolean;
    city: string;
    promo: string;
    createdAt: string;
}
