import { BaseComposer, BotContext } from 'src/types/interfaces';
import { AccountService } from './account.service';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { Menu } from '@grammyjs/menu';
export declare class AccountComposer extends BaseComposer {
    private readonly accountService;
    private readonly AppConfigService;
    constructor(accountService: AccountService, AppConfigService: AppConfigService);
    filter: (ctx: BotContext) => Promise<boolean>;
    menu: Menu<BotContext>;
    takePart: (ctx: BotContext) => Promise<void>;
    about: (ctx: BotContext) => Promise<void>;
    contactUs: (ctx: BotContext) => Promise<void>;
    myChecks: (ctx: BotContext) => Promise<void>;
    myPrizes: (ctx: BotContext) => Promise<void>;
    winners: (ctx: BotContext) => Promise<void>;
    rules: (ctx: BotContext) => Promise<void>;
    photo: (ctx: BotContext) => Promise<void>;
}
