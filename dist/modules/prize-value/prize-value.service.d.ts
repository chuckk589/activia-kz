import { EntityManager } from '@mikro-orm/core';
import { RetrievePrizeValueDto } from './dto/retrieve-prize-value.dto';
export declare class PrizeValueService {
    private readonly em;
    constructor(em: EntityManager);
    findAll(): Promise<RetrievePrizeValueDto[]>;
    remove(id: number): Promise<void>;
}
