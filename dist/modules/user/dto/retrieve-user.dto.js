"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveUserDto = void 0;
const User_1 = require("../../mikroorm/entities/User");
class RetrieveUserDto {
    constructor(user) {
        this.id = user.id;
        this.chatId = user.chatId;
        this.username = user.username;
        this.credentials = user.credentials;
        this.locale = user.locale;
        this.role = user.role;
        this.phone = user.phone;
        this.promo = user.promo?.translation?.getLocalizedLabel(User_1.Locale.RU) || null;
        this.createdAt = user.createdAt.toLocaleString();
        this.city = user.city?.translation?.getLocalizedLabel(User_1.Locale.RU) || null;
    }
}
exports.RetrieveUserDto = RetrieveUserDto;
//# sourceMappingURL=retrieve-user.dto.js.map