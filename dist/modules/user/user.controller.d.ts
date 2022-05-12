import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./dto/retrieve-user.dto").RetrieveUserDto[]>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): Promise<number>;
}
