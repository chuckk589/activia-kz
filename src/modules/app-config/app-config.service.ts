import { Controller, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TranslatableConfig } from 'src/types/interfaces';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  get<T>(key: string, options?: any) {
    return this.configService.get<T>(key, options) || this.configService.get<T>(key.toUpperCase(), options);
  }
  get cities(): TranslatableConfig[] {
    return Reflect.getMetadata('cities', this);
  }
  get promos(): TranslatableConfig[] {
    return Reflect.getMetadata('promos', this);
  }
}
