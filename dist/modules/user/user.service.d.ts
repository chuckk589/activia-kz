import { EntityManager } from '@mikro-orm/core';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly em;
    constructor(em: EntityManager);
    findAll(): Promise<RetrieveUserDto[]>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): Promise<number>;
}
