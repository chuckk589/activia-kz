import { Menu } from '@grammyjs/menu';
import { Keyboard } from 'grammy';
import { UserLocale } from 'src/modules/mikroorm/entities/User';
import { BotStep } from 'src/types/enums';
import { BaseComposer, BotContext } from 'src/types/interfaces';
import { Command, ComposerController, On, Use } from '../common/decorators';
import { label } from '../common/helpers';
import { globalService } from './global.service';

@ComposerController
export class globalComposer extends BaseComposer {
  constructor(private readonly globalService: globalService) {
    super();
  }

  @Use()
  menu = new Menu<BotContext>('any').dynamic((ctx, range) => {
    switch (ctx.session.botStep) {
      case BotStep.default: {
        ['ru', 'uz'].map((lang) =>
          range.text(label({ text: lang }), async (ctx) => {
            await this.globalService.updateUser(ctx.from.id, { locale: lang as UserLocale });
            ctx.i18n.locale(lang);
            ctx.session.botStep = BotStep.age;
            await ctx.editMessageCaption({ caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('askAge') });
          }),
        );
        break;
      }
      case BotStep.age: {
        range.text(label({ text: 'yes' }), async (ctx) => {
          ctx.session.botStep = BotStep.phone;
          await ctx.editMessageCaption({
            caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('askPhone'),
          });
          ctx.reply('asa', { reply_markup: new Keyboard().requestContact('contact') });
        });
        range.text(label({ text: 'no' }), async (ctx) => {
          await ctx.deleteMessage();
          ctx.session.botStep = BotStep.default;
          ctx.reply(ctx.i18n.t('restricted'));
        });
        break;
      }
      case BotStep.gender: {
        ['male', 'female'].map((gender) => {
          range.text(label({ text: gender }), async (ctx) => {
            await this.globalService.updateUser(ctx.from.id, { locale: lang as UserLocale });
          });
        });
        break;
      }
    }
    return range;
  });
  @On(':contact')
  contact = async (ctx: BotContext) => {
    if (ctx.session.botStep == BotStep.phone) {
      await this.globalService.updateUser(ctx.from.id, { phone: ctx.message.contact.phone_number });
      ctx.session.botStep = BotStep.gender;
      await ctx.replyAndSave(ctx.i18n.t('askGender'), this.menu);
    }
  };

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
