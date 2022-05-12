import { Lottery } from 'src/modules/mikroorm/entities/Lottery';
import { Winner } from 'src/modules/mikroorm/entities/Winner';
export declare class RetrieveLotteryDto {
    constructor(lottery: Lottery);
    id: number;
    start: string;
    end: string;
    status: string;
    prize: string;
    primaryWinners: number;
    reserveWinners: number;
    createdAt: string;
    winners: RetrieveWinnerDto[];
}
declare class RetrieveWinnerDto {
    constructor(winner: Winner);
    id: number;
    confirmed: boolean;
    notified: boolean;
    primary: boolean;
    fancyId: string;
    credentials: string;
    phone: string;
    city: string;
    checkPath: string;
}
export {};
