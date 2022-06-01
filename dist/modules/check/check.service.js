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
exports.CheckService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const grammy_1 = require("grammy");
const constants_1 = require("../../constants");
const i18n_1 = __importDefault(require("../bot/middleware/i18n"));
const Check_1 = require("../mikroorm/entities/Check");
const CheckStatus_1 = require("../mikroorm/entities/CheckStatus");
const User_1 = require("../mikroorm/entities/User");
const retrieve_check_dto_1 = require("./dto/retrieve-check.dto");
let CheckService = class CheckService {
    constructor(em, bot) {
        this.em = em;
        this.bot = bot;
    }
    async findAll() {
        return (await this.em.find(Check_1.Check, {}, { populate: ['user.city.translation.values', 'status.translation.values', 'status.comment.values'] })).map((check) => new retrieve_check_dto_1.RetrieveCheckDto(check));
    }
    async update(id, updateCheckDto) {
        const user = await this.em.findOneOrFail(User_1.User, { checks: { id } }, { populate: ['checks', 'checks.status'] });
        const check = user.checks.getItems().find((check) => check.id === id);
        const approvedAmmount = user.checks.getItems().filter((check) => check.status.name === CheckStatus_1.CheckState.APPROVED).length;
        const check_status = await this.em.findOneOrFail(CheckStatus_1.CheckStatus, { id: Number(updateCheckDto.status) }, { populate: ['comment', 'translation'] });
        let message;
        if (check_status.name == CheckStatus_1.CheckState.REJECTED) {
            message = i18n_1.default.t(check.user.locale, check_status.comment.name, { check_id: check.fancyId });
        }
        else if (check_status.name == CheckStatus_1.CheckState.APPROVED) {
            message = i18n_1.default.t(check.user.locale, approvedAmmount === 0 ? 'STATUS_APPROVED_1' : 'STATUS_APPROVED_2', {
                check_id: check.fancyId,
            });
        }
        else {
            return;
        }
        check.status = check_status;
        await this.em.persistAndFlush(check);
        return await this.bot.api.sendMessage(check.user.chatId, message, { parse_mode: 'HTML' });
    }
};
CheckService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.BOT_NAME)),
    __metadata("design:paramtypes", [mysql_1.EntityManager, grammy_1.Bot])
], CheckService);
exports.CheckService = CheckService;
//# sourceMappingURL=check.service.js.map