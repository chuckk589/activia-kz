import { Check } from 'src/modules/mikroorm/entities/Check';
import { BotContext } from 'src/types/interfaces';
import i18n from '../middleware/i18n';

export function match(key: string): RegExp {
  const locales: string[] = i18n.availableLocales();
  return new RegExp(locales.map((l) => `^${i18n.t(l, key)}$`).join('|'));
}

export const label = (payload: { text: string; payload?: string }) => {
  return (ctx: BotContext) => ctx.i18n.t(payload.text);
};

export const checkMessage = (ctx: BotContext, checks: Check[]): string => {
  if (!checks.length) return ctx.i18n.t('noChecks');
  //FIXME:
  // const locale = ctx.i18n.locale() as 'ru' | 'uz';
  // const message = checks.reduce((s, c) => {
  //   s += `\n${c.fancyId} - ${c.status.translation[locale]}`;
  //   return s;
  // }, ctx.i18n.t('myChecks'));
  // return message;
};
