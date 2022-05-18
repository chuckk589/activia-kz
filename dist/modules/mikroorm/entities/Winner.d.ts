import { Check } from './Check';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Lottery } from './Lottery';
import { PrizeValue } from './PrizeValue';
export declare class Winner extends CustomBaseEntity {
    id: number;
    primary: boolean;
    confirmed: boolean;
    notified: boolean;
    lottery: Lottery;
    check: Check;
    prize_value: PrizeValue;
}
