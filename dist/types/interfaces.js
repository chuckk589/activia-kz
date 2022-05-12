"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComposer = exports.TranslatableConfig = exports.AdminAction = exports.AdminCommand = exports.BotContext = void 0;
const grammy_1 = require("grammy");
class BotContext extends grammy_1.Context {
    constructor(update, api, me) {
        super(update, api, me);
        this.cleanAndReply = async (text, other, signal) => {
            await this.clean();
            return this.reply(text, other, signal);
        };
        this.replyAndSave = async (text, other, signal) => {
            await this.reply(text, other, signal).then((r) => (this.session.menuId = r.message_id));
        };
        this.cleanReplySave = async (text, other, signal) => {
            await this.clean();
            await this.replyAndSave(text, other, signal);
        };
        this.clean = async () => {
            if (this.session.menuId) {
                await this.api.deleteMessage(this.from.id, this.session.menuId).catch(() => { });
                this.session.menuId = undefined;
            }
        };
        this.save = async (messageId) => {
            this.session.menuId = messageId;
        };
    }
    get session() {
        throw new Error('Method not implemented.');
    }
    set session(session) {
        throw new Error('Method not implemented.');
    }
}
exports.BotContext = BotContext;
class AdminCommand {
    constructor(payload) {
        const data = payload.split(' ');
        if (data[0] in AdminAction) {
            this.action = data[0];
            this.payload = data[1];
        }
        else {
            throw new Error('invalidPayload');
        }
    }
}
exports.AdminCommand = AdminCommand;
var AdminAction;
(function (AdminAction) {
    AdminAction["access"] = "access";
    AdminAction["forward"] = "forward";
    AdminAction["link"] = "link";
})(AdminAction = exports.AdminAction || (exports.AdminAction = {}));
class TranslatableConfig {
    constructor(payload) {
        this.id = payload.id;
        this.key = payload.name;
        this.translation = payload.translation.getAllLabels();
    }
}
exports.TranslatableConfig = TranslatableConfig;
class BaseComposer {
    getMiddleware() {
        return this._composer;
    }
}
exports.BaseComposer = BaseComposer;
//# sourceMappingURL=interfaces.js.map