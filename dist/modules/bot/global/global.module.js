"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalModule = void 0;
const common_1 = require("@nestjs/common");
const telegram_module_1 = require("../../../telegram/telegram.module");
const global_composer_1 = require("./global.composer");
const global_service_1 = require("./global.service");
let globalModule = class globalModule {
};
globalModule = __decorate([
    (0, common_1.Module)({
        imports: [telegram_module_1.TelegramModule],
        providers: [global_service_1.globalService, global_composer_1.globalComposer],
        exports: [global_composer_1.globalComposer],
    })
], globalModule);
exports.globalModule = globalModule;
//# sourceMappingURL=global.module.js.map