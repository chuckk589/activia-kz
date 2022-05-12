"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppConfigModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Config_1 = require("../mikroorm/entities/Config");
const interfaces_1 = require("../../types/interfaces");
const City_1 = require("../mikroorm/entities/City");
const Promo_1 = require("../mikroorm/entities/Promo");
const app_config_service_1 = require("./app-config.service");
let AppConfigModule = AppConfigModule_1 = class AppConfigModule {
    constructor(em) {
        this.em = em;
    }
    static async forRootAsync(options = {}) {
        const ConfigProvider = {
            provide: 'any',
            useFactory: async (orm) => {
                const configs = await orm.em.find(Config_1.Config, {});
                configs.map((config) => (process.env[config.name] = config.value));
                const cities = await orm.em.find(City_1.City, {}, { populate: ['translation.values'] });
                Reflect.defineMetadata('cities', cities.map((city) => new interfaces_1.TranslatableConfig(city)), app_config_service_1.AppConfigService);
                const promos = await orm.em.find(Promo_1.Promo, {}, { populate: ['translation.values'] });
                Reflect.defineMetadata('promos', promos.map((promo) => new interfaces_1.TranslatableConfig(promo)), app_config_service_1.AppConfigService);
                return {};
            },
            inject: [core_1.MikroORM],
        };
        return {
            module: AppConfigModule_1,
            imports: [config_1.ConfigModule.forRoot()],
            providers: [ConfigProvider],
            exports: [config_1.ConfigModule],
        };
    }
};
AppConfigModule = AppConfigModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [app_config_service_1.AppConfigService],
        exports: [app_config_service_1.AppConfigService],
    }),
    __metadata("design:paramtypes", [core_1.EntityManager])
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;
//# sourceMappingURL=app-config.module.js.map