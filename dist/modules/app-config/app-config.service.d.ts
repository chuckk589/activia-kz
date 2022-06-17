import { ConfigService } from '@nestjs/config';
import { TranslatableConfig } from 'src/types/interfaces';
export declare class AppConfigService {
    private readonly configService;
    constructor(configService: ConfigService, any: any);
    get<T>(key: string, options?: any): (string extends infer T_1 ? T_1 extends string ? T_1 extends keyof T ? string extends infer T_2 ? T_2 extends string ? T_2 extends import("@nestjs/config").Path<T[T_1]> ? import("@nestjs/config").PathValue<T[T_1], T_2> : never : never : never : never : never : never) | (any extends infer T_3 ? T_3 extends any ? T_3 extends keyof T ? T[T_3] : never : never : never);
    get cities(): TranslatableConfig[];
    get promos(): TranslatableConfig[];
}
