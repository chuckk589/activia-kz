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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnerService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const grammy_1 = require("grammy");
const constants_1 = require("../../constants");
const i18n_1 = __importDefault(require("../bot/middleware/i18n"));
const Winner_1 = require("../mikroorm/entities/Winner");
let WinnerService = class WinnerService {
    constructor(em, bot) {
        this.em = em;
        this.bot = bot;
    }
    async sendNotification(id) {
        const winner = await this.em.findOneOrFail(Winner_1.Winner, { id }, { populate: ['check.user', 'lottery.prize'] });
        const message = i18n_1.default.t(winner.check.user.locale, winner.lottery.prize.name, { check_id: winner.check.fancyId });
        await this.bot.api.sendMessage(winner.check.user.chatId, message);
        await this.em.nativeUpdate(Winner_1.Winner, { id }, { notified: true });
    }
    async update(id, updateWinnerDto) {
        return await this.em.nativeUpdate(Winner_1.Winner, { id }, { confirmed: Boolean(updateWinnerDto.confirmed) });
    }
};
WinnerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.BOT_NAME)),
    __metadata("design:paramtypes", [core_1.EntityManager, grammy_1.Bot])
], WinnerService);
exports.WinnerService = WinnerService;
//# sourceMappingURL=winner.service.js.map