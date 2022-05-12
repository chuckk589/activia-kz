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
exports.BotLotteryDto = exports.Lottery = void 0;
const core_1 = require("@mikro-orm/core");
const CustomBaseEntity_1 = require("./CustomBaseEntity");
const LotteryStatus_1 = require("./LotteryStatus");
const Prize_1 = require("./Prize");
const Winner_1 = require("./Winner");
const luxon_1 = require("luxon");
let Lottery = class Lottery extends CustomBaseEntity_1.CustomBaseEntity {
    constructor() {
        super(...arguments);
        this.winners = new core_1.Collection(this);
    }
    async beforeCreate(args) {
        if (!this.status) {
            this.status = await args.em.findOne(LotteryStatus_1.LotteryStatus, { name: LotteryStatus_1.LotteryState.PENDING });
        }
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Lottery.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Lottery.prototype, "start", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Lottery.prototype, "end", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Lottery.prototype, "primaryWinners", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Lottery.prototype, "reserveWinners", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => LotteryStatus_1.LotteryStatus),
    __metadata("design:type", LotteryStatus_1.LotteryStatus)
], Lottery.prototype, "status", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Prize_1.Prize),
    __metadata("design:type", Prize_1.Prize)
], Lottery.prototype, "prize", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Winner_1.Winner, (winner) => winner.lottery, { orphanRemoval: true }),
    __metadata("design:type", Object)
], Lottery.prototype, "winners", void 0);
__decorate([
    (0, core_1.BeforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Lottery.prototype, "beforeCreate", null);
Lottery = __decorate([
    (0, core_1.Entity)()
], Lottery);
exports.Lottery = Lottery;
class BotLotteryDto {
    constructor(lottery, locale) {
        this.week = luxon_1.DateTime.fromJSDate(lottery.end).weekNumber;
        this.prize = lottery.prize.translation.getLocalizedLabel(locale);
        this.winners = lottery.winners
            .toArray()
            .map((winner) => ({ phone: winner.check.user.phone.slice(0, -6) + 'XXXX' + winner.check.user.phone.slice(-2) }));
    }
}
exports.BotLotteryDto = BotLotteryDto;
//# sourceMappingURL=Lottery.js.map