import { EntityManager } from '@mikro-orm/core';
import { Bot } from 'grammy';
import { BotContext } from 'src/types/interfaces';
import { UpdateWinnerDto } from './dto/update-winner.dto';
export declare class WinnerService {
    private readonly em;
    private bot;
    constructor(em: EntityManager, bot: Bot<BotContext>);
    sendNotification(id: number): Promise<void>;
    update(id: number, updateWinnerDto: UpdateWinnerDto): Promise<number | void>;
}
