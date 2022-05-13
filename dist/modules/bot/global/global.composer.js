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
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalComposer = void 0;
const menu_1 = require("@grammyjs/menu");
const grammy_1 = require("grammy");
const User_1 = require("../../mikroorm/entities/User");
const enums_1 = require("../../../types/enums");
const interfaces_1 = require("../../../types/interfaces");
const decorators_1 = require("../common/decorators");
const helpers_1 = require("../common/helpers");
const global_service_1 = require("./global.service");
const router_1 = require("@grammyjs/router");
const app_config_service_1 = require("../../app-config/app-config.service");
const keyboards_1 = require("../common/keyboards");
const nestjs_pino_1 = require("nestjs-pino");
let globalComposer = class globalComposer extends interfaces_1.BaseComposer {
    constructor(globalService, AppConfigService, logger) {
        super();
        this.globalService = globalService;
        this.AppConfigService = AppConfigService;
        this.logger = logger;
        this.menu = new menu_1.Menu('reg-menu').dynamic((ctx, range) => {
            const locale = (ctx.i18n.locale() in User_1.Locale ? ctx.i18n.locale() : 'ru');
            switch (ctx.session.step) {
                case enums_1.BotStep.default: {
                    Object.values(User_1.Locale).map((lang) => range.text((0, helpers_1.label)({ text: lang }), async (ctx) => {
                        await this.globalService.updateUser(ctx.from.id, { locale: lang });
                        ctx.i18n.locale(lang);
                        ctx.session.step = enums_1.BotStep.age;
                        await ctx.editMessageCaption({ caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('askAge') });
                    }));
                    break;
                }
                case enums_1.BotStep.age: {
                    range.text((0, helpers_1.label)({ text: 'yes' }), async (ctx) => {
                        ctx.session.step = enums_1.BotStep.gender;
                        await ctx.editMessageCaption({ caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('askGender') });
                    });
                    range.text((0, helpers_1.label)({ text: 'no' }), async (ctx) => {
                        ctx.session.step = enums_1.BotStep.default;
                        ctx.menu.close();
                        await ctx.reply(ctx.i18n.t('restricted'));
                    });
                    break;
                }
                case enums_1.BotStep.gender: {
                    Object.values(User_1.UserGender).map((gender) => {
                        range.text((0, helpers_1.label)({ text: gender }), async (ctx) => {
                            ctx.session.step = enums_1.BotStep.city;
                            await ctx.editMessageCaption({ caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('askCity') });
                        });
                    });
                    break;
                }
                case enums_1.BotStep.city: {
                    this.AppConfigService.cities.map((city) => range.text((0, helpers_1.label)({ text: city.translation[locale] }), async (ctx) => {
                        ctx.session.step = enums_1.BotStep.promo;
                        await this.globalService.updateCity(ctx.from.id, city.id);
                        await ctx.editMessageCaption({ caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('askPromo') });
                    }));
                    break;
                }
                case enums_1.BotStep.promo: {
                    this.AppConfigService.promos.map((promo) => range.text((0, helpers_1.label)({ text: promo.translation[locale] }), async (ctx) => {
                        await this.globalService.updatePromo(ctx.from.id, promo.id);
                        ctx.session.step = enums_1.BotStep.name;
                        ctx.menu.close();
                        await ctx.reply(ctx.i18n.t('askName'));
                    }));
                    break;
                }
                case enums_1.BotStep.forward: {
                    range.text((0, helpers_1.label)({ text: 'startForward' }), async (ctx) => {
                        const ids = await this.globalService.getUserChatIds();
                        const data = { total: ids.length, processed: 0, errors: 0 };
                        for (let i = 0; i < ids.length; i++) {
                            try {
                                await this.globalService.singleForward(ctx.session.bulkId, ctx.from.id, ids[i]);
                                data.processed++;
                                (i % 10 === 0 || i == ids.length - 1) &&
                                    (await ctx.editMessageText(ctx.i18n.t('bulkProgress', data), { reply_markup: null }));
                            }
                            catch (error) {
                                data.errors++;
                                this.logger.warn(`${ids[i]} ${error.code} ${error.errorMessage}`);
                            }
                        }
                        ctx.session.step = enums_1.BotStep.default;
                    });
                    range.text((0, helpers_1.label)({ text: 'cancelForward' }), async (ctx) => {
                        ctx.session.step = enums_1.BotStep.default;
                        await ctx.deleteMessage();
                    });
                    break;
                }
            }
            return range;
        });
        this.start = async (ctx) => {
            ctx.session.step = enums_1.BotStep.default;
            const user = await this.globalService.getUser(ctx);
            ctx.session.isRegistered = user.registered;
            ctx.i18n.locale(user.locale);
            ctx.session.isRegistered
                ? await ctx.reply(ctx.i18n.t('mainMenu'), { reply_markup: (0, keyboards_1.mainKeyboard)(ctx) })
                : await ctx.replyWithPhoto(`https://picsum.photos/200/300?random=${Math.random()}`, {
                    caption: ctx.i18n.t('start') + '\n\n' + ctx.i18n.t('choose_lang'),
                    reply_markup: this.menu,
                });
        };
        this.admin = async (ctx) => {
            if (ctx.match) {
                try {
                    const payload = new interfaces_1.AdminCommand(ctx.match);
                    if (payload.action == interfaces_1.AdminAction.access) {
                        const isCorrect = await this.globalService.checkAdminCode(ctx.from.id, payload.payload);
                        await ctx.reply(ctx.i18n.t(isCorrect ? 'adminAccessGranted' : 'adminAccessDenied'));
                    }
                    else if (payload.action == interfaces_1.AdminAction.forward) {
                        const isAdmin = await this.globalService.checkUserRole(ctx.from.id);
                        if (isAdmin) {
                            ctx.session.step = enums_1.BotStep.forward;
                            await ctx.reply(ctx.i18n.t('adminAskMessage'));
                        }
                        else {
                            await ctx.reply(ctx.i18n.t('adminAccessDenied'));
                        }
                    }
                    else if (payload.action == interfaces_1.AdminAction.link) {
                        await ctx.reply(ctx.i18n.t('adminLink', { link: `${this.AppConfigService.get('url')}/#login?p=any&l=${ctx.from.id}` }), { parse_mode: 'HTML' });
                    }
                }
                catch (error) {
                    await ctx.reply(ctx.i18n.t(error.message));
                }
            }
            else {
                await ctx.reply(ctx.i18n.t('adminHelp'));
            }
        };
        this.contact = async (ctx) => {
            if (ctx.session.step == enums_1.BotStep.phone) {
                await this.globalService.updateUser(ctx.from.id, { phone: ctx.message.contact.phone_number, registered: true });
                ctx.session.step = enums_1.BotStep.default;
                ctx.session.isRegistered = true;
                await ctx.reply(ctx.i18n.t('registered'), { reply_markup: (0, keyboards_1.mainKeyboard)(ctx) });
            }
        };
        this.router = new router_1.Router((ctx) => ctx.session.step)
            .route(enums_1.BotStep.name, async (ctx) => {
            await this.globalService.updateUser(ctx.from.id, { credentials: ctx.message.text });
            ctx.session.step = enums_1.BotStep.phone;
            await ctx.reply('askPhone', {
                reply_markup: new grammy_1.Keyboard().requestContact('contact'),
            });
        })
            .route(enums_1.BotStep.forward, async (ctx) => {
            ctx.session.bulkId = ctx.message.message_id;
            await this.globalService.singleForward(ctx.session.bulkId, ctx.from.id, ctx.from.id);
            await ctx.reply(ctx.i18n.t('checkForwardMessage'), { reply_markup: this.menu });
        });
    }
};
__decorate([
    (0, decorators_1.Use)(),
    __metadata("design:type", Object)
], globalComposer.prototype, "menu", void 0);
__decorate([
    (0, decorators_1.Command)('start'),
    __metadata("design:type", Object)
], globalComposer.prototype, "start", void 0);
__decorate([
    (0, decorators_1.Command)('admin'),
    __metadata("design:type", Object)
], globalComposer.prototype, "admin", void 0);
__decorate([
    (0, decorators_1.On)(':contact'),
    __metadata("design:type", Object)
], globalComposer.prototype, "contact", void 0);
__decorate([
    (0, decorators_1.Use)(),
    __metadata("design:type", Object)
], globalComposer.prototype, "router", void 0);
globalComposer = __decorate([
    decorators_1.ComposerController,
    __param(2, (0, nestjs_pino_1.InjectPinoLogger)('globalComposer')),
    __metadata("design:paramtypes", [global_service_1.globalService,
        app_config_service_1.AppConfigService,
        nestjs_pino_1.PinoLogger])
], globalComposer);
exports.globalComposer = globalComposer;
//# sourceMappingURL=global.composer.js.map