"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
const grammy_1 = require("grammy");
const enums_1 = require("../../../types/enums");
const initial = () => ({
    menuId: undefined,
    bulkId: undefined,
    step: enums_1.BotStep.default,
    isRegistered: undefined,
    winners: [],
});
function getSessionKey(ctx) {
    return ctx.from?.id.toString();
}
exports.session = (0, grammy_1.session)({
    initial: initial,
    getSessionKey: getSessionKey,
});
//# sourceMappingURL=session.js.map