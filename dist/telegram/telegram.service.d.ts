import { EntityManager } from '@mikro-orm/mysql';
export declare class TelegramService {
    private readonly em;
    constructor(em: EntityManager);
    updateSessionString(newSessionString: string): Promise<void>;
}
