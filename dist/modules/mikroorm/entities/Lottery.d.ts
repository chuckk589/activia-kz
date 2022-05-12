import { Collection, EventArgs } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { LotteryStatus } from './LotteryStatus';
import { Prize } from './Prize';
import { Locale } from './User';
import { Winner } from './Winner';
export declare class Lottery extends CustomBaseEntity {
    id: number;
    start: Date;
    end: Date;
    primaryWinners: number;
    reserveWinners: number;
    status: LotteryStatus;
    prize: Prize;
    winners: Collection<Winner, unknown>;
    beforeCreate(args: EventArgs<Lottery>): Promise<void>;
}
export declare class BotLotteryDto {
    constructor(lottery: Lottery, locale: Locale);
    week: number;
    prize: string;
    winners: {
        phone: string;
    }[];
}
