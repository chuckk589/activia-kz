import { EntityManager } from '@mikro-orm/core';
import { RetrieveStatusDto } from './dto/retrieve-status.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
export declare class StatusService {
    private readonly em;
    constructor(em: EntityManager);
    updateLocales(updateLocaleDto: UpdateLocaleDto): void;
    findLocales(): Promise<{
        [key: string]: {
            [key: string]: string;
        };
    }>;
    findAll(): Promise<Record<string, RetrieveStatusDto[]>>;
}
