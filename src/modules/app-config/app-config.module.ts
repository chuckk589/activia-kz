import { EntityManager, MikroORM } from '@mikro-orm/core';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { Config } from 'src/modules/mikroorm/entities/Config';
import { AppConfigService } from './app-config.service';
@Global()
@Module({})
export class AppConfigModule {
  constructor(private readonly em: EntityManager) {}
  public static forRootAsync(options: ConfigModuleOptions = {}): DynamicModule {
    const BotOptionsProvider: Provider = {
      provide: 'any',
      useFactory: async (orm: MikroORM) => {
        const configs = await orm.em.find(Config, {});
        configs.map((config) => (process.env[config.name] = config.value));
        return {};
      },
      inject: [MikroORM],
    };
    return {
      module: AppConfigModule,
      imports: [ConfigModule.forRoot(options)],
      providers: [BotOptionsProvider, AppConfigService],
      exports: [ConfigModule, AppConfigService],
    };
  }
}
