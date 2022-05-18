import { PrizeValue } from 'src/modules/mikroorm/entities/PrizeValue';
export declare class RetrievePrizeValueDto {
    constructor(prize: PrizeValue);
    id: number;
    qr_payload: string;
    prizeId: number;
}
