import { EntityManager } from '@mikro-orm/mysql';
import { User } from 'src/modules/mikroorm/entities/User';
import { BotContext } from 'src/types/interfaces';
import { TelegramController } from 'src/telegram/telegram.controller';
export declare class globalService {
    private readonly em;
    private readonly TelegramController;
    getUserChatIds(): Promise<string[]>;
    singleForward(message_id: number, fromPeer: string | number, toPeer: string | number): Promise<void>;
    checkAdminCode(from: number, text: string): Promise<boolean>;
    checkUserRole(from: number): Promise<boolean>;
    updatePromo(from: number, id: number): Promise<void>;
    updateCity(from: number, id: number): Promise<void>;
    updateUser(from: number, options: Partial<User>): Promise<void>;
    constructor(em: EntityManager, TelegramController: TelegramController);
    getUser(ctx: BotContext): Promise<import("@mikro-orm/core").EntityDTO<import("@mikro-orm/core").Loaded<User, never>>>;
}
