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
exports.StatusService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const CheckStatus_1 = require("../mikroorm/entities/CheckStatus");
const City_1 = require("../mikroorm/entities/City");
const LotteryStatus_1 = require("../mikroorm/entities/LotteryStatus");
const Prize_1 = require("../mikroorm/entities/Prize");
const Promo_1 = require("../mikroorm/entities/Promo");
const User_1 = require("../mikroorm/entities/User");
const retrieve_status_dto_1 = require("./dto/retrieve-status.dto");
let StatusService = class StatusService {
    constructor(em) {
        this.em = em;
    }
    async findAll() {
        const cities = await this.em.find(City_1.City, {}, { populate: ['translation.values'] });
        const promos = await this.em.find(Promo_1.Promo, {}, { populate: ['translation.values'] });
        const check_s = await this.em.find(CheckStatus_1.CheckStatus, {}, { populate: ['translation.values', 'comment.values'] });
        const lottery_s = await this.em.find(LotteryStatus_1.LotteryStatus, {}, { populate: ['translation.values'] });
        const prizes = await this.em.find(Prize_1.Prize, {}, { populate: ['translation.values'] });
        return {
            cities: cities.map((city) => new retrieve_status_dto_1.RetrieveStatusDto(city)),
            promotions: promos.map((promo) => new retrieve_status_dto_1.RetrieveStatusDto(promo)),
            check_statuses: check_s.map((check_s) => new retrieve_status_dto_1.RetrieveStatusDto(check_s)),
            lottery_statuses: lottery_s.map((lottery_s) => new retrieve_status_dto_1.RetrieveStatusDto(lottery_s)),
            locales: Object.values(User_1.Locale).map((locale) => new retrieve_status_dto_1.RetrieveStatusDto({ value: locale, label: locale == 'ru' ? 'Русский' : 'Узбекский' })),
            roles: Object.values(User_1.UserRole).map((role) => new retrieve_status_dto_1.RetrieveStatusDto({ value: role, label: role == 'user' ? 'Пользователь' : 'Администратор' })),
            prizes: prizes.map((prize) => new retrieve_status_dto_1.RetrieveStatusDto(prize)),
        };
    }
};
StatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], StatusService);
exports.StatusService = StatusService;
//# sourceMappingURL=status.service.js.map