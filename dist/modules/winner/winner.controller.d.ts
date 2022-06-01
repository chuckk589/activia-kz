import { WinnerService } from './winner.service';
import { UpdateWinnerDto } from './dto/update-winner.dto';
export declare class WinnerController {
    private readonly winnerService;
    constructor(winnerService: WinnerService);
    update(id: string, updateWinnerDto: UpdateWinnerDto): Promise<number | void>;
    notify(id: string): Promise<void>;
}
