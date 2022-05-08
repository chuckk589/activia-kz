import { BaseComposer, BotContext } from 'src/types/interfaces';
import { ComposerController, Filter, Hears, On } from '../common/decorators';
import { AccountService } from './account.service';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
@ComposerController
export class AccountComposer extends BaseComposer {
  constructor(private readonly accountService: AccountService, private readonly AppConfigService: AppConfigService) {
    super();
  }
  //FIXME: make nested
  @Filter()
  filter = async (ctx: BotContext) => await this.accountService.isRegistered(ctx);

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
  //TODO: myPrizes winners
}
