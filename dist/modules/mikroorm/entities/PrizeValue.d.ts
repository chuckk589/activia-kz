import { Collection } from '@mikro-orm/core';
import { Prize } from './Prize';
import { Winner } from './Winner';
export declare class PrizeValue {
    id: number;
    qr_payload: string;
    prize: Prize;
    winners: Collection<Winner, unknown>;
}
