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
exports.globalService = void 0;
const core_1 = require("@mikro-orm/core");
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const City_1 = require("../../mikroorm/entities/City");
const Config_1 = require("../../mikroorm/entities/Config");
const Promo_1 = require("../../mikroorm/entities/Promo");
const User_1 = require("../../mikroorm/entities/User");
const telegram_controller_1 = require("../../../telegram/telegram.controller");
let globalService = class globalService {
    constructor(em, TelegramController) {
        this.em = em;
        this.TelegramController = TelegramController;
    }
    async getUserChatIds() {
        const users = await this.em.find(User_1.User, {});
        return users.map((user) => user.chatId);
    }
    async singleForward(message_id, fromPeer, toPeer) {
        await this.TelegramController.forwardMessage(message_id, fromPeer, toPeer);
    }
    async checkAdminCode(from, text) {
        const config = await this.em.findOne(Config_1.Config, { name: 'ADMIN_PASSCODE' });
        if (config.value === text) {
            await this.updateUser(from, { role: User_1.UserRole.ADMIN });
            return true;
        }
        else {
            return false;
        }
    }
    async checkUserRole(from) {
        try {
            const user = await this.em.findOneOrFail(User_1.User, { chatId: String(from) });
            return user.role == User_1.UserRole.ADMIN;
        }
        catch (error) {
            return false;
        }
    }
    async updatePromo(from, id) {
        await this.em.nativeUpdate(User_1.User, { chatId: String(from) }, {
            promo: this.em.getReference(Promo_1.Promo, id),
        });
    }
    async updateCity(from, id) {
        await this.em.nativeUpdate(User_1.User, { chatId: String(from) }, {
            city: this.em.getReference(City_1.City, id),
        });
    }
    async updateUser(from, options) {
        await this.em.nativeUpdate(User_1.User, { chatId: String(from) }, options);
    }
    async getUser(ctx) {
        let user = await this.em.findOne(User_1.User, { chatId: String(ctx.from.id) });
        if (!user) {
            user = this.em.create(User_1.User, {
                chatId: String(ctx.from.id),
                username: ctx.from.username,
            });
            await this.em.persistAndFlush(user);
        }
        return (0, core_1.wrap)(user).toPOJO();
    }
};
globalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysql_1.EntityManager, telegram_controller_1.TelegramController])
], globalService);
exports.globalService = globalService;
//# sourceMappingURL=global.service.js.map