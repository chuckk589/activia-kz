import { Translation } from './Translation';
export declare enum LotteryState {
    PENDING = "PENDING",
    ENDED = "ENDED"
}
export declare class LotteryStatus {
    id: number;
    name: LotteryState;
    translation: Translation;
}
