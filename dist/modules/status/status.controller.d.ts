import { StatusService } from './status.service';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    findAll(): Promise<Record<string, import("./dto/retrieve-status.dto").RetrieveStatusDto[]>>;
}
