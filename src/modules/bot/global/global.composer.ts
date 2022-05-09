import { Menu } from '@grammyjs/menu';
import { Keyboard } from 'grammy';
import { UserGender, Locale } from 'src/modules/mikroorm/entities/User';
import { BotStep } from 'src/types/enums';
import { BaseComposer, BotContext } from 'src/types/interfaces';
import { Command, ComposerController, On, Use } from '../common/decorators';
import { label } from '../common/helpers';
import { globalService } from './global.service';
import { Router } from '@grammyjs/router';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { mainKeyboard } from '../common/keyboards';

@ComposerController
export class globalComposer extends BaseComposer {
  constructor(private readonly globalService: globalService, private readonly AppConfigService: AppConfigService) {
    super();
  }

  @Use()
  menu = new Menu<BotContext>('any').dynamic((ctx, range) => {
    const locale = (ctx.i18n.locale() in Locale ? ctx.i18n.locale() : 'ru') as Locale;
    switch (ctx.session.step) {
      case BotStep.default: {
        ['ru', 'uz'].map((lang) =>
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
          await ctx.reply('askPhone', { reply_markup: new Keyboard().requestContact('contact') });
        });
        range.text(label({ text: 'no' }), async (ctx) => {
          await ctx.deleteMessage();
          ctx.session.step = BotStep.default;
          ctx.reply(ctx.i18n.t('restricted'));
        });
        break;
      }
      case BotStep.gender: {
        ['male', 'female'].map((gender) => {
          range.text(label({ text: gender }), async (ctx) => {
            await this.globalService.updateUser(ctx.from.id, { gender: gender as UserGender });
            ctx.session.step = BotStep.name;
            await ctx.editMessageText(ctx.i18n.t('askName'));
          });
        });
        break;
      }
      case BotStep.city: {
        this.AppConfigService.cities.map((city) =>
          range.text(label({ text: city.translation[locale] }), async (ctx) => {
            await this.globalService.updateCity(ctx.from.id, city.id);
            ctx.session.step = BotStep.promo;
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
    }
    return range;
  });

  @On(':contact')
  contact = async (ctx: BotContext) => {
    if (ctx.session.step == BotStep.phone) {
      await this.globalService.updateUser(ctx.from.id, { phone: ctx.message.contact.phone_number });
      ctx.session.step = BotStep.gender;
      await ctx.replyAndSave(ctx.i18n.t('askGender'), this.menu);
    }
  };

  @Use()
  router = new Router<BotContext>((ctx) => ctx.session.step) //
    .route(BotStep.name, async (ctx) => {
      await this.globalService.updateUser(ctx.from.id, { credentials: ctx.message.text });
      ctx.session.step = BotStep.city;
      await ctx.cleanReplySave(ctx.i18n.t('askCity'), this.menu);
    });

  //TODO: check reg and pull to menu if so
  @Command('start')
  start = async (ctx: BotContext) => {
    const user = await this.globalService.getUser(ctx);
    ctx.i18n.locale(user.locale);
    //FIXME:
    await ctx.replyWithPhoto(`https://picsum.photos/200/300?random=${Math.random()}`, {
      caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('choose_lang'),
      reply_markup: this.menu,
    });
  };
}
