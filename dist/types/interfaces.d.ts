import { Api, Composer, Context, SessionFlavor } from 'grammy';
import { I18nContext, I18nContextFlavor } from '@grammyjs/i18n';
import { MenuControlPanel, MenuFlavor } from '@grammyjs/menu';
import { ModuleMetadata } from '@nestjs/common';
import { Update, UserFromGetMe, Message } from 'grammy/out/platform.node';
import { BotStep } from './enums';
import { Locale } from 'src/modules/mikroorm/entities/User';
import { City } from 'src/modules/mikroorm/entities/City';
import { Promo } from 'src/modules/mikroorm/entities/Promo';
import { BotLotteryDto } from 'src/modules/mikroorm/entities/Lottery';
export declare class BotContext extends Context implements SessionFlavor<Session>, I18nContextFlavor, MenuFlavor {
    constructor(update: Update, api: Api, me: UserFromGetMe);
    menu: MenuControlPanel;
    i18n: I18nContext;
    match: string;
    clean: () => Promise<void>;
    cleanAndReply: (text: string, other?: any, signal?: AbortSignal) => Promise<Message.TextMessage>;
    replyAndSave: (text: string, other?: any, signal?: AbortSignal) => Promise<void>;
    cleanReplySave: (text: string, other?: any, signal?: AbortSignal) => Promise<void>;
    save: (messageId: number) => void;
    get session(): Session;
    set session(session: Session);
}
export interface Session {
    bulkId: number;
    menuId: number;
    step: BotStep;
    isRegistered: boolean;
    winners: BotLotteryDto[];
}
export declare class AdminCommand {
    constructor(payload: string);
    action: AdminAction;
    payload: string;
}
export declare type CheckData = {
    fancyId: string;
    checkCount: number;
};
export declare enum AdminAction {
    access = "access",
    forward = "forward",
    link = "link"
}
export declare class TranslatableConfig {
    constructor(payload: Promo | City);
    id: number;
    key: string;
    translation: {
        [key in Locale]: string;
    };
}
export declare class BaseComposer {
    protected _composer: Composer<any>;
    getMiddleware(): Composer<any>;
}
export interface GrammyBotOptions {
    token: string;
    middleware?: any[];
}
export interface GrammyBotOptionsAsync extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<GrammyBotOptions> | GrammyBotOptions;
    inject?: any[];
}
