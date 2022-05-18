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
exports.PrizeValueService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const PrizeValue_1 = require("../mikroorm/entities/PrizeValue");
const retrieve_prize_value_dto_1 = require("./dto/retrieve-prize-value.dto");
let PrizeValueService = class PrizeValueService {
    constructor(em) {
        this.em = em;
    }
    async findAll() {
        const values = await this.em.find(PrizeValue_1.PrizeValue, {}, { populate: ['prize.translation.values'] });
        return values.map((value) => new retrieve_prize_value_dto_1.RetrievePrizeValueDto(value));
    }
    async remove(id) {
        const prizeValue = await this.em.findOne(PrizeValue_1.PrizeValue, { id }, { populate: ['winners'] });
        if (prizeValue.winners.length === 0) {
            await this.em.removeAndFlush(prizeValue);
        }
        else {
            throw new common_1.HttpException(`PrizeValue with id ${id} has ${prizeValue.winners.length} assosiated winners and can't be removed`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
PrizeValueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], PrizeValueService);
exports.PrizeValueService = PrizeValueService;
//# sourceMappingURL=prize-value.service.js.map