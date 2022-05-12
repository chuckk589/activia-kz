import { EntityManager } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/mikroorm/entities/User';
export declare class AuthService {
    private readonly jwtService;
    private readonly em;
    constructor(jwtService: JwtService, em: EntityManager);
    validateUser(chatId: string | number, pass: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
