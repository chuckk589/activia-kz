import { ConfigService } from '@nestjs/config';
import { TranslatableConfig } from 'src/types/interfaces';
export declare class AppConfigService {
    private readonly configService;
    constructor(configService: ConfigService, any: any);
    get<T>(key: string, options?: any): (string extends keyof T ? string extends import("@nestjs/config").Path<T[keyof T & string]> ? import("@nestjs/config").PathValue<T[keyof T & string], import("@nestjs/config").Path<T[keyof T & string]> & string> : never : never) | (any extends keyof T ? T[any] : never);
    get cities(): TranslatableConfig[];
    get promos(): TranslatableConfig[];
}
