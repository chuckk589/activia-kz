import { TelegramService } from './telegram.service';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { PinoLogger } from 'nestjs-pino';
export declare class TelegramController {
    private readonly telegramService;
    private readonly AppConfigService;
    private readonly logger;
    constructor(telegramService: TelegramService, AppConfigService: AppConfigService, logger: PinoLogger);
    private client;
    private InitConnection;
    forwardMessage: (message_id: number, fromPeer: string | number, toPeer: string | number) => Promise<void>;
}
