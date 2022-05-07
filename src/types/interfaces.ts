import { Api, Composer, Context, SessionFlavor } from 'grammy';
import { I18nContext, I18nContextFlavor, TemplateData } from '@grammyjs/i18n';
import { MenuControlPanel, MenuFlavor } from '@grammyjs/menu';
import { match } from 'src/modules/bot/common/helpers';
import { ModuleMetadata } from '@nestjs/common';
import { Update, UserFromGetMe, Message } from 'grammy/out/platform.node';
import { BotStep } from './enums';

export class BotContext extends Context implements SessionFlavor<Session>, I18nContextFlavor, MenuFlavor {
  constructor(update: Update, api: Api, me: UserFromGetMe) {
    super(update, api, me);
    this.cleanAndReply = async (text: string, other?: any, signal?: any) => {
      await this.clean();
      return this.reply(text, other, signal);
    };
    this.replyAndSave = async (text: string, other?: any, signal?: any) => {
      await this.reply(text, other, signal).then((r) => (this.session.menuId = r.message_id));
    };
    this.cleanReplySave = async (text: string, other?: any, signal?: any) => {
      await this.clean();
      await this.replyAndSave(text, other, signal);
    };
    this.clean = async () => {
      if (this.session.menuId) {
        await this.api.deleteMessage(this.from.id, this.session.menuId).catch(() => {});
        this.session.menuId = undefined;
      }
    };
    this.save = async (messageId: number) => {
      this.session.menuId = messageId;
    };
  }
  menu: MenuControlPanel;
  i18n: I18nContext;
  match: string;
  clean: () => Promise<void>;
  cleanAndReply: (text: string, other?: any, signal?: AbortSignal) => Promise<Message.TextMessage>;
  replyAndSave: (text: string, other?: any, signal?: AbortSignal) => Promise<void>;
  cleanReplySave: (text: string, other?: any, signal?: AbortSignal) => Promise<void>;
  save: (messageId: number) => void;

  get session(): Session {
    throw new Error('Method not implemented.');
  }
  set session(session: Session) {
    throw new Error('Method not implemented.');
  }
}

export interface Session {
  menuId: number;
  botStep: BotStep;
}

export class BaseComposer {
  protected _composer: Composer<any>;
  getMiddleware(): Composer<any> {
    return this._composer;
  }
}
export interface GrammyBotOptions {
  token: string;
  middleware?: any[];
}
export interface GrammyBotOptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<GrammyBotOptions> | GrammyBotOptions;
  inject?: any[];
}
