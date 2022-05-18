"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrizeValueModule = void 0;
const common_1 = require("@nestjs/common");
const prize_value_service_1 = require("./prize-value.service");
const prize_value_controller_1 = require("./prize-value.controller");
let PrizeValueModule = class PrizeValueModule {
};
PrizeValueModule = __decorate([
    (0, common_1.Module)({
        controllers: [prize_value_controller_1.PrizeValueController],
        providers: [prize_value_service_1.PrizeValueService]
    })
], PrizeValueModule);
exports.PrizeValueModule = PrizeValueModule;
//# sourceMappingURL=prize-value.module.js.map