import { BotContext } from 'src/types/interfaces';
import i18n from '../middleware/i18n';

export function match(key: string): RegExp {
  const locales: string[] = i18n.availableLocales();
  return new RegExp(locales.map((l) => `^${i18n.t(l, key)}$`).join('|'));
}

export const label = (payload: { text: string; payload?: string }) => {
  return (ctx: BotContext) => ctx.i18n.t(payload.text);
};
