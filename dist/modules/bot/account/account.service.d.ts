import { EntityManager } from '@mikro-orm/core';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { User } from 'src/modules/mikroorm/entities/User';
import { BotContext, CheckData } from 'src/types/interfaces';
import { PinoLogger } from 'nestjs-pino';
import { BotLotteryDto, Lottery } from 'src/modules/mikroorm/entities/Lottery';
export declare class AccountService {
    private readonly em;
    private readonly AppConfigService;
    private readonly logger;
    constructor(em: EntityManager, AppConfigService: AppConfigService, logger: PinoLogger);
    getLotteries(ctx: BotContext): Promise<BotLotteryDto[]>;
    getUserLotteries(ctx: BotContext): Promise<Lottery[]>;
    getUserChecks(ctx: BotContext): Promise<string>;
    registerCheck(from: number, path: string): Promise<CheckData>;
    insertNewCheck(user: User, path: string): Promise<CheckData>;
    downloadFile(ctx: BotContext): Promise<string>;
    isRegistered(ctx: BotContext): Promise<boolean>;
}
