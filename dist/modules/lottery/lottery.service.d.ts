import { EntityManager } from '@mikro-orm/core';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { RetrieveLotteryDto } from './dto/retrieve-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';
export declare class LotteryService {
    private readonly em;
    constructor(em: EntityManager);
    create(createLotteryDto: CreateLotteryDto): Promise<RetrieveLotteryDto>;
    findAll(): Promise<RetrieveLotteryDto[]>;
    update(id: number, updateLotteryDto: UpdateLotteryDto): Promise<number>;
    remove(id: number): Promise<void>;
}
