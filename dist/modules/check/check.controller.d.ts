import { CheckService } from './check.service';
import { UpdateCheckDto } from './dto/update-check.dto';
export declare class CheckController {
    private readonly checkService;
    constructor(checkService: CheckService);
    findAll(): Promise<import("./dto/retrieve-check.dto").RetrieveCheckDto[]>;
    update(id: string, updateCheckDto: UpdateCheckDto): Promise<import("@grammyjs/types").Message.TextMessage>;
}
