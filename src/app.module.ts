import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { BotModule } from './modules/bot/bot.module';
import { MikroORM } from '@mikro-orm/core';
import { Config } from './modules/mikroorm/entities/Config';
import { AuthModule } from './modules/auth/auth.module';
import { globalComposer } from './modules/bot/global/global.composer';
import { globalModule } from './modules/bot/global/global.module';
import { BaseComposer } from './types/interfaces';

import checkTime from './modules/bot/middleware/checkTime';
import i18n from './modules/bot/middleware/i18n';
import { session } from './modules/bot/middleware/session';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          allowGlobalContext: true,
          entities: ['./dist/src/modules/mikroorm/entities/'],
          entitiesTs: ['./src/modules/mikroorm/entities/'],
          clientUrl: configService.get('database', { infer: true }),
        };
      },
    }),
    BotModule.forRootAsync({
      imports: [globalModule],
      inject: [MikroORM, globalComposer],
      useFactory: async (orm: MikroORM, ...composers: BaseComposer[]) => {
        const config = await orm.em.findOne(Config, {
          name: 'BOT_TOKEN_PROD',
        });
        return {
          token: config.value,
          middleware: [session, checkTime, i18n.middleware(), ...composers.map((c) => c.getMiddleware())],
        };
      },
    }),
    //AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
