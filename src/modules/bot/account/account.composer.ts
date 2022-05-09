import { BaseComposer, BotContext } from 'src/types/interfaces';
import { ComposerController, Filter, Hears, On, Use } from '../common/decorators';
import { AccountService } from './account.service';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { Menu } from '@grammyjs/menu';
import { label, prizeMessageWeek } from '../common/helpers';

@ComposerController
export class AccountComposer extends BaseComposer {
  constructor(private readonly accountService: AccountService, private readonly AppConfigService: AppConfigService) {
    super();
  }
  //FIXME: make nested
  @Filter()
  filter = async (ctx: BotContext) => await this.accountService.isRegistered(ctx);

  @Use()
  menu = new Menu<BotContext>('winner-menu').dynamic((ctx, range) => {
    const weeks = Array.from(new Set(ctx.session.winners.map((winner) => winner.week)));
    weeks.map((week, idx) => {
      range.text(label({ text: ctx.i18n.t('week') + ' ' + (idx + 1) }), async (ctx) => {
        await ctx.reply(prizeMessageWeek(ctx, week));
      });
    });
  });

  @Hears('takePart')
  takePart = async (ctx: BotContext) => {
    await ctx.reply(ctx.i18n.t('takePart'));
  };

  @Hears('about')
  about = async (ctx: BotContext) => {
    await ctx.reply(ctx.i18n.t('about'));
  };

  @Hears('contactUs')
  contactUs = async (ctx: BotContext) => {
    await ctx.reply(ctx.i18n.t('contactUs'));
  };

  @Hears('myChecks')
  myChecks = async (ctx: BotContext) => {
    const message = await this.accountService.getUserChecks(ctx);
    await ctx.reply(message);
  };

  @Hears('myPrizes')
  myPrizes = async (ctx: BotContext) => {
    const message = await this.accountService.getUserLotteries(ctx);
    await ctx.reply(message);
  };

  @Hears('winners')
  winners = async (ctx: BotContext) => {
    ctx.session.winners = await this.accountService.getLotteries(ctx);
    await ctx.cleanReplySave(ctx.i18n.t('winners'), { reply_markup: this.menu });
  };

  @Hears('rules')
  rules = async (ctx: BotContext) => {
    const url = this.AppConfigService.get('url');
    await ctx.reply(ctx.i18n.t('get-rules', { link: url + '/public/files/rules.pdf' }), { parse_mode: 'HTML' });
  };

  @On(':photo')
  photo = async (ctx: BotContext) => {
    const path = await this.accountService.downloadFile(ctx);
    const check = await this.accountService.registerCheck(ctx.from.id, path);
    await ctx.reply(ctx.i18n.t('checkAccepted', { id: check.fancyId }));
  };
}
