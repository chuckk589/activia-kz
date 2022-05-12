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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = AppConfigService_1 = class AppConfigService {
    constructor(configService, any) {
        this.configService = configService;
    }
    get(key, options) {
        return this.configService.get(key, options) || this.configService.get(key.toUpperCase(), options);
    }
    get cities() {
        return Reflect.getMetadata('cities', AppConfigService_1);
    }
    get promos() {
        return Reflect.getMetadata('promos', AppConfigService_1);
    }
};
AppConfigService = AppConfigService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('any')),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], AppConfigService);
exports.AppConfigService = AppConfigService;
//# sourceMappingURL=app-config.service.js.map