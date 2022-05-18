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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Winner = void 0;
const core_1 = require("@mikro-orm/core");
const Check_1 = require("./Check");
const CustomBaseEntity_1 = require("./CustomBaseEntity");
const Lottery_1 = require("./Lottery");
const PrizeValue_1 = require("./PrizeValue");
let Winner = class Winner extends CustomBaseEntity_1.CustomBaseEntity {
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Winner.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], Winner.prototype, "primary", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], Winner.prototype, "confirmed", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], Winner.prototype, "notified", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Lottery_1.Lottery),
    __metadata("design:type", Lottery_1.Lottery)
], Winner.prototype, "lottery", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Check_1.Check),
    __metadata("design:type", Check_1.Check)
], Winner.prototype, "check", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => PrizeValue_1.PrizeValue),
    __metadata("design:type", PrizeValue_1.PrizeValue)
], Winner.prototype, "prize_value", void 0);
Winner = __decorate([
    (0, core_1.Entity)()
], Winner);
exports.Winner = Winner;
//# sourceMappingURL=Winner.js.map