import { PrizeValueService } from './prize-value.service';
export declare class PrizeValueController {
    private readonly prizeValueService;
    constructor(prizeValueService: PrizeValueService);
    findAll(): Promise<import("./dto/retrieve-prize-value.dto").RetrievePrizeValueDto[]>;
    remove(id: string): Promise<void>;
}
