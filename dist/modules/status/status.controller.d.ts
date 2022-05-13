import { UpdateLocaleDto } from './dto/update-locale.dto';
import { StatusService } from './status.service';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    findAll(): Promise<Record<string, import("./dto/retrieve-status.dto").RetrieveStatusDto[]>>;
    findLocales(): Promise<{
        [key: string]: {
            [key: string]: string;
        };
    }>;
    updateLocales(updateLocaleDto: UpdateLocaleDto): void;
}
