import { DynamicModule } from '@nestjs/common';
import { Bot } from 'grammy';
import { BotContext, GrammyBotOptions, GrammyBotOptionsAsync } from 'src/types/interfaces';
export declare class BotModule {
    static forRootAsync(options: GrammyBotOptionsAsync): DynamicModule;
    static createBotFactory(options: GrammyBotOptions): Promise<Bot<BotContext>>;
}
