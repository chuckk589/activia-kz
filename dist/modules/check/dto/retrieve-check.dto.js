"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveCheckDto = void 0;
const User_1 = require("../../mikroorm/entities/User");
class RetrieveCheckDto {
    constructor(check) {
        this.id = check.id;
        this.fancyId = check.fancyId;
        this.credentials = check.user.credentials;
        this.phone = check.user.phone;
        this.city = check.user.city.translation.getLocalizedLabel(User_1.Locale.RU);
        this.checkPath = check.path;
        this.createdAt = check.createdAt.toLocaleString();
        this.status = check.status.id;
    }
}
exports.RetrieveCheckDto = RetrieveCheckDto;
//# sourceMappingURL=retrieve-check.dto.js.map