import { Module, DynamicModule, Inject, Provider, Global } from '@nestjs/common';
import { Bot, Context, GrammyError, HttpError } from 'grammy';
import { BOT_NAME, BOT_OPTIONS } from 'src/constants';
import { BotStep } from 'src/types/enums';
import { BotContext, GrammyBotOptions, GrammyBotOptionsAsync } from 'src/types/interfaces';

@Global()
@Module({})
export class BotModule {
  public static forRootAsync(options: GrammyBotOptionsAsync): DynamicModule {
    const BotProvider: Provider = {
      provide: BOT_NAME,
      useFactory: async (options: GrammyBotOptions) => await this.createBotFactory(options),
      inject: [BOT_OPTIONS],
    };
    const BotOptionsProvider: Provider = {
      provide: BOT_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
    return {
      module: BotModule,
      imports: options.imports,
      providers: [BotProvider, BotOptionsProvider],
      exports: [BotProvider, BotOptionsProvider],
    };
  }
  static async createBotFactory(options: GrammyBotOptions): Promise<Bot<BotContext>> {
    const bot = new Bot<BotContext>(options.token, {
      ContextConstructor: BotContext,
    });

    options.middleware?.map((middleware) => bot.use(middleware));
    bot.api.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'admin', description: 'Admin section' },
    ]);
    bot.catch((err) => {
      const ctx: BotContext = err.ctx;
      ctx.session.step = BotStep.default;
      console.error(`Error while handling update ${ctx.update.update_id}:`);
      const e = err.error;
      if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
      } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
      } else {
        console.error('Unknown error:', e);
      }
    });
    bot.start();
    return bot;
  }
}
