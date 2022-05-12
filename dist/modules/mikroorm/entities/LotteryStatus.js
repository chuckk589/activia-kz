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
exports.LotteryStatus = exports.LotteryState = void 0;
const core_1 = require("@mikro-orm/core");
const Translation_1 = require("./Translation");
var LotteryState;
(function (LotteryState) {
    LotteryState["PENDING"] = "PENDING";
    LotteryState["ENDED"] = "ENDED";
})(LotteryState = exports.LotteryState || (exports.LotteryState = {}));
let LotteryStatus = class LotteryStatus {
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], LotteryStatus.prototype, "id", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => LotteryState, default: LotteryState.PENDING }),
    __metadata("design:type", String)
], LotteryStatus.prototype, "name", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Translation_1.Translation),
    __metadata("design:type", Translation_1.Translation)
], LotteryStatus.prototype, "translation", void 0);
LotteryStatus = __decorate([
    (0, core_1.Entity)()
], LotteryStatus);
exports.LotteryStatus = LotteryStatus;
//# sourceMappingURL=LotteryStatus.js.map