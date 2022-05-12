import { CheckStatus } from 'src/modules/mikroorm/entities/CheckStatus';
import { City } from 'src/modules/mikroorm/entities/City';
import { LotteryStatus } from 'src/modules/mikroorm/entities/LotteryStatus';
import { Prize } from 'src/modules/mikroorm/entities/Prize';
import { Promo } from 'src/modules/mikroorm/entities/Promo';
export declare class RetrieveStatusDto {
    constructor(payload: Promo | City | Prize | LotteryStatus | CheckStatus | {
        id?: number;
        label?: string;
        value: string;
    });
    label: string;
    value: string;
    comment?: string;
}
