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
exports.AccountComposer = void 0;
const interfaces_1 = require("../../../types/interfaces");
const decorators_1 = require("../common/decorators");
const account_service_1 = require("./account.service");
const app_config_service_1 = require("../../app-config/app-config.service");
const menu_1 = require("@grammyjs/menu");
const helpers_1 = require("../common/helpers");
let AccountComposer = class AccountComposer extends interfaces_1.BaseComposer {
    constructor(accountService, AppConfigService) {
        super();
        this.accountService = accountService;
        this.AppConfigService = AppConfigService;
        this.filter = async (ctx) => {
            const isRegistered = await this.accountService.isRegistered(ctx);
            return isRegistered ? true : !(await ctx.reply(ctx.i18n.t('notRegistered')));
        };
        this.menu = new menu_1.Menu('winner-menu').dynamic((ctx, range) => {
            const weeks = Array.from(new Set(ctx.session.winners.map((winner) => winner.week)));
            weeks.map((week, idx) => {
                range.text((0, helpers_1.label)({ text: ctx.i18n.t('week') + ' ' + (idx + 1) }), async (ctx) => {
                    await ctx.reply((0, helpers_1.prizeMessageWeek)(ctx, week));
                });
            });
        });
        this.takePart = async (ctx) => {
            await ctx.reply(ctx.i18n.t('participateDetails'));
        };
        this.about = async (ctx) => {
            await ctx.reply(ctx.i18n.t('aboutDetails'));
        };
        this.contactUs = async (ctx) => {
            await ctx.reply(ctx.i18n.t('contactDetails'));
        };
        this.myChecks = async (ctx) => {
            const message = await this.accountService.getUserChecks(ctx);
            await ctx.reply(message);
        };
        this.myPrizes = async (ctx) => {
            const lotteries = await this.accountService.getUserLotteries(ctx);
            await ctx.reply((0, helpers_1.prizeMessage)(ctx, lotteries));
        };
        this.winners = async (ctx) => {
            ctx.session.winners = await this.accountService.getLotteries(ctx);
            await ctx.cleanReplySave((0, helpers_1.winnersMessage)(ctx), { reply_markup: this.menu });
        };
        this.rules = async (ctx) => {
            const url = this.AppConfigService.get('url');
            await ctx.reply(ctx.i18n.t('getRules', { link: url + '/assets/rules.pdf' }), { parse_mode: 'HTML' });
        };
        this.photo = async (ctx) => {
            const path = await this.accountService.downloadFile(ctx);
            const check = await this.accountService.registerCheck(ctx.from.id, path);
            await ctx.reply((0, helpers_1.checkMessageByCount)(ctx, check));
        };
    }
};
__decorate([
    (0, decorators_1.Filter)(),
    __metadata("design:type", Object)
], AccountComposer.prototype, "filter", void 0);
__decorate([
    (0, decorators_1.Use)(undefined, 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "menu", void 0);
__decorate([
    (0, decorators_1.Hears)('participate', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "takePart", void 0);
__decorate([
    (0, decorators_1.Hears)('about', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "about", void 0);
__decorate([
    (0, decorators_1.Hears)('contacts', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "contactUs", void 0);
__decorate([
    (0, decorators_1.Hears)('myChecks', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "myChecks", void 0);
__decorate([
    (0, decorators_1.Hears)('myPrizes', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "myPrizes", void 0);
__decorate([
    (0, decorators_1.Hears)('winners', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "winners", void 0);
__decorate([
    (0, decorators_1.Hears)('rules', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "rules", void 0);
__decorate([
    (0, decorators_1.On)(':photo', 'filter'),
    __metadata("design:type", Object)
], AccountComposer.prototype, "photo", void 0);
AccountComposer = __decorate([
    decorators_1.ComposerController,
    __metadata("design:paramtypes", [account_service_1.AccountService, app_config_service_1.AppConfigService])
], AccountComposer);
exports.AccountComposer = AccountComposer;
//# sourceMappingURL=account.composer.js.map