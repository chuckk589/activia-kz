import { Menu } from '@grammyjs/menu';
import { Keyboard } from 'grammy';
import { UserGender, Locale } from 'src/modules/mikroorm/entities/User';
import { BotStep } from 'src/types/enums';
import { adminCommand, BaseComposer, BotContext } from 'src/types/interfaces';
import { Command, ComposerController, On, Use } from '../common/decorators';
import { label } from '../common/helpers';
import { globalService } from './global.service';
import { Router } from '@grammyjs/router';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { mainKeyboard } from '../common/keyboards';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@ComposerController
export class globalComposer extends BaseComposer {
  constructor(
    private readonly globalService: globalService,
    private readonly AppConfigService: AppConfigService,
    @InjectPinoLogger('globalComposer') private readonly logger: PinoLogger,
  ) {
    super();
  }

  @Use()
  menu = new Menu<BotContext>('reg-menu').dynamic((ctx, range) => {
    const locale = (ctx.i18n.locale() in Locale ? ctx.i18n.locale() : 'ru') as Locale;
    switch (ctx.session.step) {
      case BotStep.default: {
        Object.values(Locale).map((lang) =>
          range.text(label({ text: lang }), async (ctx) => {
            await this.globalService.updateUser(ctx.from.id, { locale: lang as Locale });
            ctx.i18n.locale(lang);
            ctx.session.step = BotStep.age;
            await ctx.editMessageCaption({ caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('askAge') });
          }),
        );
        break;
      }
      case BotStep.age: {
        range.text(label({ text: 'yes' }), async (ctx) => {
          ctx.session.step = BotStep.phone;
          await ctx.reply('askPhone', {
            reply_markup: new Keyboard().requestContact('contact'),
          });
        });
        range.text(label({ text: 'no' }), async (ctx) => {
          ctx.session.step = BotStep.default;
          await ctx.deleteMessage();
          await ctx.reply(ctx.i18n.t('restricted'));
        });
        break;
      }
      case BotStep.gender: {
        Object.values(UserGender).map((gender) => {
          range.text(label({ text: gender }), async (ctx) => {
            ctx.session.step = BotStep.name;
            await this.globalService.updateUser(ctx.from.id, { gender: gender as UserGender });
            await ctx.editMessageText(ctx.i18n.t('askName'));
          });
        });
        break;
      }
      case BotStep.city: {
        this.AppConfigService.cities.map((city) =>
          range.text(label({ text: city.translation[locale] }), async (ctx) => {
            ctx.session.step = BotStep.promo;
            await this.globalService.updateCity(ctx.from.id, city.id);
            await ctx.editMessageText(ctx.i18n.t('askPromo'));
          }),
        );
        break;
      }
      case BotStep.promo: {
        this.AppConfigService.promos.map((promo) =>
          range.text(label({ text: promo.translation[locale] }), async (ctx) => {
            await this.globalService.updatePromo(ctx.from.id, promo.id);
            ctx.session.step = BotStep.registered;
            await ctx.clean();
            await ctx.reply(ctx.i18n.t('registered'), { reply_markup: mainKeyboard(ctx) });
          }),
        );
        break;
      }
      case BotStep.forward: {
        range.text(label({ text: 'startForward' }), async (ctx) => {
          const ids = await this.globalService.getUserChatIds();
          const data = { total: ids.length, processed: 0, errors: 0 };
          for (let i = 0; i < 300; i++) {
            try {
              //await this.globalService.singleForward(ctx.session.bulkId, ctx.from.id, ids[0]);
              data.processed++;
              (i % 10 === 0 || i == 299) &&
                (await ctx.editMessageText(ctx.i18n.t('bulkProgress', data), { reply_markup: null }));
            } catch (error) {
              data.errors++;
              this.logger.warn(`${ids[i]} ${error.code} ${error.errorMessage}`);
            }
          }
          ctx.session.step = BotStep.default;
        });
        range.text(label({ text: 'cancelForward' }), async (ctx) => {
          ctx.session.step = BotStep.default;
          await ctx.deleteMessage();
        });
        break;
      }
    }
    return range;
  });
  //TODO: check reg and pull to menu if so
  @Command('start')
  start = async (ctx: BotContext) => {
    ctx.session.step = BotStep.default;
    const user = await this.globalService.getUser(ctx);
    ctx.i18n.locale(user.locale);
    //FIXME:
    await ctx.replyWithPhoto(`https://picsum.photos/200/300?random=${Math.random()}`, {
      caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('choose_lang'),
      reply_markup: this.menu,
    });
  };
  @Command('admin')
  admin = async (ctx: BotContext) => {
    if (ctx.match) {
      try {
        const payload = new adminCommand(ctx.match);
        if (payload.action == 'access') {
          const isCorrect = await this.globalService.checkAdminCode(ctx.from.id, payload.payload);
          await ctx.reply(ctx.i18n.t(isCorrect ? 'adminAccessGranted' : 'adminAccessDenied'));
        } else if (payload.action == 'forward') {
          const isAdmin = await this.globalService.checkUserRole(ctx.from.id);
          if (isAdmin) {
            ctx.session.step = BotStep.forward;
            await ctx.reply(ctx.i18n.t('adminAskMessage'));
          } else {
            await ctx.reply(ctx.i18n.t('adminAccessDenied'));
          }
        }
      } catch (error) {
        await ctx.reply(ctx.i18n.t(error.message));
      }
    } else {
      await ctx.reply(ctx.i18n.t('adminHelp'));
    }
  };
  @On(':contact')
  contact = async (ctx: BotContext) => {
    if (ctx.session.step == BotStep.phone) {
      await this.globalService.updateUser(ctx.from.id, { phone: ctx.message.contact.phone_number });
      ctx.session.step = BotStep.gender;
      await ctx.replyAndSave(ctx.i18n.t('askGender'), { reply_markup: this.menu });
    }
  };

  @Use()
  router = new Router<BotContext>((ctx) => ctx.session.step) //
    .route(BotStep.name, async (ctx) => {
      await this.globalService.updateUser(ctx.from.id, { credentials: ctx.message.text });
      ctx.session.step = BotStep.city;
      await ctx.cleanReplySave(ctx.i18n.t('askCity'), { reply_markup: this.menu });
    })
    .route(BotStep.forward, async (ctx) => {
      ctx.session.bulkId = ctx.message.message_id;
      await this.globalService.singleForward(ctx.session.bulkId, ctx.from.id, ctx.from.id);
      await ctx.reply(ctx.i18n.t('checkForwardMessage'), { reply_markup: this.menu });
    });
}
