import { EntityManager } from '@mikro-orm/core';
import { RetrieveStatusDto } from './dto/retrieve-status.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
export declare class StatusService {
    private readonly em;
    updateLocales(updateLocaleDto: UpdateLocaleDto): void;
    findLocales(): Promise<{
        [key: string]: {
            [key: string]: string;
        };
    }>;
    constructor(em: EntityManager);
    findAll(): Promise<Record<string, RetrieveStatusDto[]>>;
}
