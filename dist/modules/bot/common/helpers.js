"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomArrayValues = exports.prizeMessageWeek = exports.winnersMessage = exports.prizeMessage = exports.checkMessage = exports.label = exports.match = void 0;
const User_1 = require("../../mikroorm/entities/User");
const i18n_1 = __importDefault(require("../middleware/i18n"));
function match(key) {
    const locales = i18n_1.default.availableLocales();
    return new RegExp(locales.map((l) => `^${i18n_1.default.t(l, key)}$`).join('|'));
}
exports.match = match;
const label = (payload) => {
    return (ctx) => ctx.i18n.t(payload.text);
};
exports.label = label;
const checkMessage = (ctx, checks) => {
    if (!checks.length)
        return ctx.i18n.t('noChecks');
    const locale = (ctx.i18n.locale() in User_1.Locale ? ctx.i18n.locale() : 'ru');
    const message = checks.reduce((s, c) => {
        s += `\n${c.fancyId} - ${c.status.translation.getLocalizedLabel(locale)}`;
        return s;
    }, ctx.i18n.t('myChecks'));
    return message;
};
exports.checkMessage = checkMessage;
const prizeMessage = (ctx, lotteries) => {
    if (!lotteries.length)
        return ctx.i18n.t('noPrizes');
    const locale = (ctx.i18n.locale() in User_1.Locale ? ctx.i18n.locale() : 'ru');
    const message = lotteries.reduce((s, c) => {
        c.winners.toArray().forEach((w) => {
            s += `\n${w.check.fancyId} - ${c.prize.translation.getLocalizedLabel(locale)}`;
        });
        return s;
    }, ctx.i18n.t('myPrizes'));
    return message;
};
exports.prizeMessage = prizeMessage;
const winnersMessage = (ctx) => {
    return ctx.session.winners.length ? ctx.i18n.t('winners') : ctx.i18n.t('noWinnersYet');
};
exports.winnersMessage = winnersMessage;
const prizeMessageWeek = (ctx, week) => {
    if (!ctx.session.winners.length)
        return ctx.i18n.t('noWinnersYet');
    return ctx.session.winners
        .filter((w) => w.week === week)
        .reduce((s, c) => {
        c.winners.map((w) => {
            s += `\n${w.phone} - ${c.prize}`;
        });
        return s;
    }, ctx.i18n.t('winners'));
};
exports.prizeMessageWeek = prizeMessageWeek;
const getRandomArrayValues = (arr, count) => {
    const shuffled = arr.slice(0);
    const result = [];
    while (result.length < count) {
        const random = Math.floor(Math.random() * shuffled.length);
        result.push(shuffled[random]);
        shuffled.splice(random, 1);
    }
    return result;
};
exports.getRandomArrayValues = getRandomArrayValues;
//# sourceMappingURL=helpers.js.map