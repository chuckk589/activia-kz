"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainKeyboard = void 0;
const grammy_1 = require("grammy");
const mainKeyboard = (ctx) => {
    return new grammy_1.Keyboard()
        .text(ctx.i18n.t('takePart'))
        .text(ctx.i18n.t('rules'))
        .text(ctx.i18n.t('about'))
        .row()
        .text(ctx.i18n.t('myChecks'))
        .text(ctx.i18n.t('myPrizes'))
        .text(ctx.i18n.t('winners'))
        .row()
        .text(ctx.i18n.t('contactUs'));
};
exports.mainKeyboard = mainKeyboard;
//# sourceMappingURL=keyboards.js.map