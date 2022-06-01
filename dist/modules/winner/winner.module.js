"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnerModule = void 0;
const common_1 = require("@nestjs/common");
const winner_service_1 = require("./winner.service");
const winner_controller_1 = require("./winner.controller");
let WinnerModule = class WinnerModule {
};
WinnerModule = __decorate([
    (0, common_1.Module)({
        controllers: [winner_controller_1.WinnerController],
        providers: [winner_service_1.WinnerService],
    })
], WinnerModule);
exports.WinnerModule = WinnerModule;
//# sourceMappingURL=winner.module.js.map