import { EntityManager } from '@mikro-orm/mysql';
import { Bot } from 'grammy';
import { BotContext } from 'src/types/interfaces';
import { RetrieveCheckDto } from './dto/retrieve-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';
export declare class CheckService {
    private readonly em;
    private bot;
    constructor(em: EntityManager, bot: Bot<BotContext>);
    findAll(): Promise<RetrieveCheckDto[]>;
    update(id: number, updateCheckDto: UpdateCheckDto): Promise<import("@grammyjs/types").Message.TextMessage>;
}
