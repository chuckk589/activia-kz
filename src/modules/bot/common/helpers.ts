import { Check } from 'src/modules/mikroorm/entities/Check';
import { BotLotteryDto, Lottery } from 'src/modules/mikroorm/entities/Lottery';
import { Locale } from 'src/modules/mikroorm/entities/User';
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
  const locale = (ctx.i18n.locale() in Locale ? ctx.i18n.locale() : 'ru') as Locale;
  const message = checks.reduce((s, c) => {
    s += `\n${c.fancyId} - ${c.status.translation.getLocalizedLabel(locale)}`;
    return s;
  }, ctx.i18n.t('myChecks'));
  return message;
};

export const prizeMessage = (ctx: BotContext, lotteries: Lottery[]): string => {
  if (!lotteries.length) return ctx.i18n.t('noPrizes');
  const locale = (ctx.i18n.locale() in Locale ? ctx.i18n.locale() : 'ru') as Locale;
  const message = lotteries.reduce((s: string, c: Lottery) => {
    c.winners.toArray().forEach((w) => {
      s += `\n${w.check.fancyId} - ${c.prize.translation.getLocalizedLabel(locale)}`;
    });
    return s;
  }, ctx.i18n.t('myPrizes'));
  return message;
};

export const prizeMessageWeek = (ctx: BotContext, week: number): string => {
  if (!ctx.session.winners.length) return ctx.i18n.t('noWinnersYet');
  return ctx.session.winners
    .filter((w) => w.week === week)
    .reduce((s: string, c: BotLotteryDto) => {
      //TODO: week number?
      c.winners.map((w) => {
        s += `\n${w.phone} - ${c.prize}`;
      });
      return s;
    }, ctx.i18n.t('winners'));
};
