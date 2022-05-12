import { Check } from 'src/modules/mikroorm/entities/Check';
export declare class RetrieveCheckDto {
    constructor(check: Check);
    id: number;
    fancyId: string;
    credentials: string;
    phone: string;
    city: string;
    status: string;
    createdAt: string;
    checkPath: string;
}
