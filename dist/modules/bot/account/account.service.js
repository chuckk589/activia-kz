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
exports.AccountService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("../../app-config/app-config.service");
const User_1 = require("../../mikroorm/entities/User");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const Check_1 = require("../../mikroorm/entities/Check");
const nestjs_pino_1 = require("nestjs-pino");
const helpers_1 = require("../common/helpers");
const CheckStatus_1 = require("../../mikroorm/entities/CheckStatus");
const Lottery_1 = require("../../mikroorm/entities/Lottery");
const LotteryStatus_1 = require("../../mikroorm/entities/LotteryStatus");
let AccountService = class AccountService {
    constructor(em, AppConfigService, logger) {
        this.em = em;
        this.AppConfigService = AppConfigService;
        this.logger = logger;
    }
    async updateUser(from, options) {
        await this.em.nativeUpdate(User_1.User, { chatId: String(from) }, options);
    }
    async getLotteries(ctx) {
        const lotteries = await this.em.find(Lottery_1.Lottery, {
            status: { name: LotteryStatus_1.LotteryState.ENDED },
        }, {
            populate: ['prize.translation.values', 'winners.check', 'winners.check.user'],
            refresh: true,
            populateWhere: {
                winners: {
                    confirmed: true,
                    check: { status: { name: CheckStatus_1.CheckState.APPROVED } },
                },
            },
        });
        return lotteries.map((l) => new Lottery_1.BotLotteryDto(l, ctx.i18n.locale()));
    }
    async getUserLotteries(ctx) {
        const lotteries = await this.em.find(Lottery_1.Lottery, {
            status: { name: LotteryStatus_1.LotteryState.ENDED },
        }, {
            refresh: true,
            populate: ['prize.translation.values', 'winners.check', 'winners.check.user'],
            populateWhere: {
                winners: {
                    confirmed: true,
                    check: { user: { chatId: String(ctx.from.id) }, status: { name: CheckStatus_1.CheckState.APPROVED } },
                },
            },
        });
        return lotteries.filter((lottery) => lottery.winners.length);
    }
    async getUserChecks(ctx) {
        const checks = await this.em.find(Check_1.Check, { user: { chatId: String(ctx.from.id) } }, { populate: ['status.comment', 'status.translation.values'] });
        return (0, helpers_1.checkMessage)(ctx, checks);
    }
    async registerCheck(from, path) {
        const user = await this.em.findOneOrFail(User_1.User, { chatId: String(from) }, { populate: ['checks'] });
        return await this.insertNewCheck(user, path);
    }
    async insertNewCheck(user, path) {
        try {
            const check = new Check_1.Check({ path });
            user.checks.add(check);
            await this.em.persistAndFlush(user);
            return { fancyId: check.fancyId, checkCount: user.checks.length };
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                this.logger.warn(`Failed to insert new check: ER_DUP_ENTRY ${user.chatId}`);
                return await this.insertNewCheck(user, path);
            }
        }
    }
    downloadFile(ctx) {
        return new Promise((res, rej) => {
            ctx
                .getFile()
                .then((file) => {
                const token = this.AppConfigService.get('BOT_TOKEN_PROD');
                (0, axios_1.default)({
                    url: `http://api.telegram.org/file/bot${token}/${file.file_path}`,
                    method: 'GET',
                    responseType: 'stream',
                }).then((response) => {
                    const uploaddir = `/files/${ctx.from.id}`;
                    const filename = `${Date.now()}.${file.file_path.split('.').pop()}`;
                    if (!fs_1.default.existsSync(`./dist/public${uploaddir}`)) {
                        fs_1.default.mkdirSync(`./dist/public${uploaddir}`, { recursive: true });
                    }
                    const photo = fs_1.default.createWriteStream(`./dist/public${uploaddir}/${filename}`);
                    response.data.pipe(photo).on('finish', function () {
                        res(`${uploaddir}/${filename}`);
                    });
                });
            });
        });
    }
    async isRegistered(ctx) {
        switch (ctx.session.isRegistered) {
            case undefined: {
                const user = await this.em.findOneOrFail(User_1.User, { chatId: String(ctx.from.id) });
                ctx.i18n.locale(user.locale);
                ctx.session.isRegistered = user.registered;
                return ctx.session.isRegistered;
            }
            default:
                return ctx.session.isRegistered;
        }
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_pino_1.InjectPinoLogger)('AccountService')),
    __metadata("design:paramtypes", [core_1.EntityManager,
        app_config_service_1.AppConfigService,
        nestjs_pino_1.PinoLogger])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map