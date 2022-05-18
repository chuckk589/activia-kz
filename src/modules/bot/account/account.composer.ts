import { BaseComposer, BotContext } from 'src/types/interfaces';
import { ComposerController, Filter, Hears, On, Use } from '../common/decorators';
import { AccountService } from './account.service';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { Menu } from '@grammyjs/menu';
import { checkMessageByCount, label, prizeMessage, prizeMessageWeek, winnersMessage } from '../common/helpers';

@ComposerController
export class AccountComposer extends BaseComposer {
  constructor(private readonly accountService: AccountService, private readonly AppConfigService: AppConfigService) {
    super();
  }
  @Filter()
  filter = async (ctx: BotContext) => {
    const isRegistered = await this.accountService.isRegistered(ctx);
    return isRegistered ? true : !(await ctx.reply(ctx.i18n.t('notRegistered')));
  };

  @Use(undefined, 'filter')
  menu = new Menu<BotContext>('winner-menu').dynamic((ctx, range) => {
    const weeks = Array.from(new Set(ctx.session.winners.map((winner) => winner.week)));
    weeks.map((week, idx) => {
      range.text(label({ text: ctx.i18n.t('week') + ' ' + (idx + 1) }), async (ctx) => {
        await ctx.reply(prizeMessageWeek(ctx, week));
      });
    });
  });

  @Hears('participate', 'filter')
  takePart = async (ctx: BotContext) => {
    await ctx.reply(ctx.i18n.t('participateDetails'));
  };

  @Hears('about', 'filter')
  about = async (ctx: BotContext) => {
    await ctx.reply(ctx.i18n.t('aboutDetails'));
  };

  @Hears('contacts', 'filter')
  contactUs = async (ctx: BotContext) => {
    await ctx.reply(ctx.i18n.t('contactDetails'));
  };

  @Hears('myChecks', 'filter')
  myChecks = async (ctx: BotContext) => {
    const message = await this.accountService.getUserChecks(ctx);
    await ctx.reply(message);
  };

  @Hears('myPrizes', 'filter')
  myPrizes = async (ctx: BotContext) => {
    const lotteries = await this.accountService.getUserLotteries(ctx);
    await ctx.reply(prizeMessage(ctx, lotteries));
  };

  @Hears('winners', 'filter')
  winners = async (ctx: BotContext) => {
    ctx.session.winners = await this.accountService.getLotteries(ctx);
    await ctx.cleanReplySave(winnersMessage(ctx), { reply_markup: this.menu });
  };

  @Hears('rules', 'filter')
  rules = async (ctx: BotContext) => {
    const url = this.AppConfigService.get('url');
    await ctx.reply(ctx.i18n.t('getRules', { link: url + '/assets/rules.pdf' }), { parse_mode: 'HTML' });
  };

  @On(':photo', 'filter')
  photo = async (ctx: BotContext) => {
    const path = await this.accountService.downloadFile(ctx);
    const check = await this.accountService.registerCheck(ctx.from.id, path);
    await ctx.reply(ctx.i18n.t('checkAccepted', { check_id: check.fancyId }));
  };
}
