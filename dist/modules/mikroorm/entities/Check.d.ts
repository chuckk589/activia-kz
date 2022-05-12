import { Collection, EventArgs } from '@mikro-orm/core';
import { CheckStatus } from './CheckStatus';
import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User';
import { Winner } from './Winner';
export declare class Check extends CustomBaseEntity {
    constructor(check?: Partial<Check>);
    id: number;
    fancyId: string;
    path: string;
    user: User;
    status: CheckStatus;
    winners: Collection<Winner, unknown>;
    beforeCreate(args: EventArgs<Check>): Promise<void>;
}
