import { LotteryService } from './lottery.service';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';
import { RetrieveLotteryDto } from './dto/retrieve-lottery.dto';
export declare class LotteryController {
    private readonly lotteryService;
    constructor(lotteryService: LotteryService);
    create(createLotteryDto: CreateLotteryDto): Promise<RetrieveLotteryDto>;
    findAll(): Promise<RetrieveLotteryDto[]>;
    update(id: string, updateLotteryDto: UpdateLotteryDto): Promise<number>;
    remove(id: string): Promise<void>;
}
