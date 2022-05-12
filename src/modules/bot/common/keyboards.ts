import { Keyboard } from 'grammy';
import { InlineKeyboardMarkup } from 'grammy/out/platform.node';
import { BotContext } from 'src/types/interfaces';
import i18n from '../middleware/i18n';

// keyboards
export const mainKeyboard = (ctx: BotContext): Keyboard => {
  return new Keyboard()
    .text(ctx.i18n.t('takePart'))
    .text(ctx.i18n.t('rules'))
    .text(ctx.i18n.t('about'))
    .row()
    .text(ctx.i18n.t('myChecks'))
    .text(ctx.i18n.t('myPrizes'))
    .text(ctx.i18n.t('winners'))
    .row()
    .text(ctx.i18n.t('contactUs'));
};

//inline
// export const languageMenu = (ctx: BotContext): InlineKeyboardMarkup => {
//   return {
//     inline_keyboard: [
//       [
//         { callback_data: 'lang:::ru', text: ctx.i18n.t('ru') },
//         { callback_data: 'lang:::en', text: ctx.i18n.t('en') },
//       ],
//     ],
//   };
// };
// exports.forwardGroup = (ctx) => {
//   return Markup.inlineKeyboard([
//       [Markup.callbackButton('Начать рассылку', 'approveForward'), Markup.callbackButton('Отмена', 'rejectForward')]
//   ]).extra()
// }
