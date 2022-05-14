import { Injectable } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly AppConfigService: AppConfigService,
    @InjectPinoLogger('TelegramController') private readonly logger: PinoLogger,
  ) {
    const stringSessionRaw = this.AppConfigService.get('APP_SESSION_STRING');
    const apiIDRaw = this.AppConfigService.get('APP_API_ID');
    const apiHashRaw = this.AppConfigService.get('APP_API_HASH');
    const botToken = this.AppConfigService.get('BOT_TOKEN_PROD');
    this.InitConnection(apiIDRaw, apiHashRaw, botToken, stringSessionRaw);
  }

  private client: TelegramClient;
  private async InitConnection(apiIDRaw: string, apiHashRaw: string, botToken: string, stringSessionRaw = '') {
    this.client = new TelegramClient(new StringSession(stringSessionRaw), Number(apiIDRaw), apiHashRaw, {
      connectionRetries: 5,
    });
    if (!stringSessionRaw) {
      this.logger.info('stringSessionRaw not found, initializing new connection');
      await this.client.start({
        botAuthToken: botToken,
      });
      const newSessionString = this.client.session.save() as any;
      await this.telegramService.updateSessionString(newSessionString);
      process.env.APP_SESSION_STRING = newSessionString;
      this.logger.info('Session string updated.');
    } else {
      await this.client.connect();
    }
    this.logger.info('You should now be connected.');
  }
  forwardMessage = async (message_id: number, fromPeer: string | number, toPeer: string | number) => {
    await this.client.invoke(
      new Api.messages.ForwardMessages({
        fromPeer: String(fromPeer),
        dropAuthor: true,
        id: [message_id],
        randomId: [<any>BigInt(Math.random().toString().replace('.', ''))],
        toPeer: String(toPeer),
        withMyScore: true,
      }),
    );
  };
}
