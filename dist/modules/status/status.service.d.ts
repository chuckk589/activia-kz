import { EntityManager } from '@mikro-orm/core';
import { RetrieveStatusDto } from './dto/retrieve-status.dto';
export declare class StatusService {
    private readonly em;
    constructor(em: EntityManager);
    findAll(): Promise<Record<string, RetrieveStatusDto[]>>;
}
