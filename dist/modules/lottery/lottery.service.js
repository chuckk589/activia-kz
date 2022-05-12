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
exports.LotteryService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const helpers_1 = require("../bot/common/helpers");
const Check_1 = require("../mikroorm/entities/Check");
const CheckStatus_1 = require("../mikroorm/entities/CheckStatus");
const Lottery_1 = require("../mikroorm/entities/Lottery");
const LotteryStatus_1 = require("../mikroorm/entities/LotteryStatus");
const Prize_1 = require("../mikroorm/entities/Prize");
const Winner_1 = require("../mikroorm/entities/Winner");
const retrieve_lottery_dto_1 = require("./dto/retrieve-lottery.dto");
let LotteryService = class LotteryService {
    constructor(em) {
        this.em = em;
    }
    async create(createLotteryDto) {
        const requestedPrize = await this.em.findOne(Prize_1.Prize, { id: Number(createLotteryDto.prize) });
        const where = {
            ...(requestedPrize.name == 'PRIZE_WEEKLY'
                ? {
                    createdAt: {
                        $gte: createLotteryDto.start,
                        $lt: createLotteryDto.end,
                    },
                    winners: { $eq: null },
                }
                : {}),
        };
        const checks = await this.em.find(Check_1.Check, {
            ...where,
            status: { name: CheckStatus_1.CheckState.APPROVED },
        }, { populate: ['winners'] });
        const totalWinners = Number(createLotteryDto.primaryWinners) + Number(createLotteryDto.reserveWinners);
        if (checks.length < totalWinners) {
            throw new common_1.HttpException('Not enough checks', common_1.HttpStatus.BAD_REQUEST);
        }
        const winners = (0, helpers_1.getRandomArrayValues)(checks, totalWinners);
        const lottery = this.em.create(Lottery_1.Lottery, {
            primaryWinners: Number(createLotteryDto.primaryWinners),
            reserveWinners: Number(createLotteryDto.reserveWinners),
            prize: this.em.getReference(Prize_1.Prize, Number(createLotteryDto.prize)),
            end: createLotteryDto.end,
            start: createLotteryDto.start,
            winners: winners.map((winner, index) => this.em.create(Winner_1.Winner, {
                check: this.em.getReference(Check_1.Check, winner.id),
                primary: index < Number(createLotteryDto.primaryWinners),
            })),
        });
        await this.em.persistAndFlush(lottery);
        await (0, core_1.wrap)(lottery).init(true, [
            'status.translation.values',
            'prize.translation.values',
            'winners.check.user.city.translation.values',
        ]);
        return new retrieve_lottery_dto_1.RetrieveLotteryDto(lottery);
    }
    async findAll() {
        return (await this.em.find(Lottery_1.Lottery, {}, {
            populate: [
                'status.translation.values',
                'prize.translation.values',
                'winners.check.user.city.translation.values',
            ],
        })).map((lottery) => new retrieve_lottery_dto_1.RetrieveLotteryDto(lottery));
    }
    async update(id, updateLotteryDto) {
        return await this.em.nativeUpdate(Lottery_1.Lottery, { id }, {
            status: this.em.getReference(LotteryStatus_1.LotteryStatus, Number(updateLotteryDto.status)),
        });
    }
    async remove(id) {
        const lottery = await this.em.find(Lottery_1.Lottery, { id }, { populate: ['winners'] });
        await this.em.removeAndFlush(lottery);
    }
};
LotteryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], LotteryService);
exports.LotteryService = LotteryService;
//# sourceMappingURL=lottery.service.js.map