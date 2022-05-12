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
exports.TelegramController = void 0;
const common_1 = require("@nestjs/common");
const telegram_service_1 = require("./telegram.service");
const app_config_service_1 = require("../modules/app-config/app-config.service");
const telegram_1 = require("telegram");
const sessions_1 = require("telegram/sessions");
const nestjs_pino_1 = require("nestjs-pino");
let TelegramController = class TelegramController {
    constructor(telegramService, AppConfigService, logger) {
        this.telegramService = telegramService;
        this.AppConfigService = AppConfigService;
        this.logger = logger;
        this.forwardMessage = async (message_id, fromPeer, toPeer) => {
            await this.client.invoke(new telegram_1.Api.messages.ForwardMessages({
                fromPeer: String(fromPeer),
                dropAuthor: true,
                id: [message_id],
                randomId: [BigInt(Math.random().toString().replace('.', ''))],
                toPeer: String(toPeer),
                withMyScore: true,
            }));
        };
        const stringSessionRaw = this.AppConfigService.get('APP_SESSION_STRING');
        const apiIDRaw = this.AppConfigService.get('APP_API_ID');
        const apiHashRaw = this.AppConfigService.get('APP_API_HASH');
        const botToken = this.AppConfigService.get('BOT_TOKEN_PROD');
        this.InitConnection(apiIDRaw, apiHashRaw, botToken, stringSessionRaw);
    }
    async InitConnection(apiIDRaw, apiHashRaw, botToken, stringSessionRaw = '') {
        this.client = new telegram_1.TelegramClient(new sessions_1.StringSession(stringSessionRaw), Number(apiIDRaw), apiHashRaw, {
            connectionRetries: 5,
        });
        if (!stringSessionRaw) {
            this.logger.info('stringSessionRaw not found, initializing new connection');
            await this.client.start({
                botAuthToken: botToken,
            });
            const newSessionString = this.client.session.save();
            await this.telegramService.updateSessionString(newSessionString);
            process.env.APP_SESSION_STRING = newSessionString;
            this.logger.info('Session string updated.');
        }
        else {
            await this.client.connect();
        }
        this.logger.info('You should now be connected.');
    }
};
TelegramController = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_pino_1.InjectPinoLogger)('TelegramController')),
    __metadata("design:paramtypes", [telegram_service_1.TelegramService,
        app_config_service_1.AppConfigService,
        nestjs_pino_1.PinoLogger])
], TelegramController);
exports.TelegramController = TelegramController;
//# sourceMappingURL=telegram.controller.js.map