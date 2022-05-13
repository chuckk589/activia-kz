import { Check } from 'src/modules/mikroorm/entities/Check';
import { Lottery } from 'src/modules/mikroorm/entities/Lottery';
import { BotContext, CheckData } from 'src/types/interfaces';
export declare function match(key: string): RegExp;
export declare const label: (payload: {
    text: string;
    payload?: string;
}) => (ctx: BotContext) => string;
export declare const checkMessage: (ctx: BotContext, checks: Check[]) => string;
export declare const prizeMessage: (ctx: BotContext, lotteries: Lottery[]) => string;
export declare const winnersMessage: (ctx: BotContext) => string;
export declare const prizeMessageWeek: (ctx: BotContext, week: number) => string;
export declare const checkMessageByCount: (ctx: BotContext, check: CheckData) => string;
export declare const getRandomArrayValues: <T>(arr: T[], count: number) => T[];
