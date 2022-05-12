import { Menu } from '@grammyjs/menu';
import { BaseComposer, BotContext } from 'src/types/interfaces';
import { globalService } from './global.service';
import { Router } from '@grammyjs/router';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { PinoLogger } from 'nestjs-pino';
export declare class globalComposer extends BaseComposer {
    private readonly globalService;
    private readonly AppConfigService;
    private readonly logger;
    constructor(globalService: globalService, AppConfigService: AppConfigService, logger: PinoLogger);
    menu: Menu<BotContext>;
    start: (ctx: BotContext) => Promise<void>;
    admin: (ctx: BotContext) => Promise<void>;
    contact: (ctx: BotContext) => Promise<void>;
    router: Router<BotContext>;
}
