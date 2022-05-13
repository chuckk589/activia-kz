"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@mikro-orm/nestjs");
const config_1 = require("@nestjs/config");
const app_config_module_1 = require("./modules/app-config/app-config.module");
const bot_module_1 = require("./modules/bot/bot.module");
const core_1 = require("@mikro-orm/core");
const Config_1 = require("./modules/mikroorm/entities/Config");
const global_composer_1 = require("./modules/bot/global/global.composer");
const global_module_1 = require("./modules/bot/global/global.module");
const checkTime_1 = __importDefault(require("./modules/bot/middleware/checkTime"));
const i18n_1 = __importDefault(require("./modules/bot/middleware/i18n"));
const session_1 = require("./modules/bot/middleware/session");
const account_module_1 = require("./modules/bot/account/account.module");
const account_composer_1 = require("./modules/bot/account/account.composer");
const nestjs_pino_1 = require("nestjs-pino");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const check_module_1 = require("./modules/check/check.module");
const lottery_module_1 = require("./modules/lottery/lottery.module");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const status_module_1 = require("./modules/status/status.module");
const winner_module_1 = require("./modules/winner/winner.module");
const telegram_module_1 = require("./telegram/telegram.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_config_module_1.AppConfigModule.forRootAsync(),
            nestjs_1.MikroOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        type: 'mysql',
                        allowGlobalContext: true,
                        ...(configService.get('node_env') === 'development'
                            ? { debug: true, logger: console.log.bind(console) }
                            : {
                                driverOptions: {
                                    connection: { socketPath: '/var/lib/mysql/mysql.sock' },
                                },
                            }),
                        entities: ['./dist/modules/mikroorm/entities/'],
                        entitiesTs: ['./src/modules/mikroorm/entities/'],
                        clientUrl: configService.get('database', { infer: true }),
                    };
                },
            }),
            bot_module_1.BotModule.forRootAsync({
                imports: [global_module_1.globalModule, account_module_1.AccountModule],
                inject: [core_1.MikroORM, global_composer_1.globalComposer, account_composer_1.AccountComposer],
                useFactory: async (orm, ...composers) => {
                    const config = await orm.em.findOne(Config_1.Config, {
                        name: 'BOT_TOKEN_PROD',
                    });
                    return {
                        token: config.value,
                        middleware: [session_1.session, checkTime_1.default, i18n_1.default.middleware(), ...composers.map((c) => c.getMiddleware())],
                    };
                },
            }),
            nestjs_pino_1.LoggerModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({ rootPath: (0, path_1.join)(__dirname, './', 'public') }),
            user_module_1.UserModule,
            lottery_module_1.LotteryModule,
            check_module_1.CheckModule,
            auth_module_1.AuthModule,
            status_module_1.StatusModule,
            winner_module_1.WinnerModule,
            telegram_module_1.TelegramModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map