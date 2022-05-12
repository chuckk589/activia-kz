"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveStatusDto = void 0;
const User_1 = require("../../mikroorm/entities/User");
class RetrieveStatusDto {
    constructor(payload) {
        this.label = 'translation' in payload ? payload.translation.getLocalizedLabel(User_1.Locale.RU) : payload.label;
        this.comment = 'comment' in payload ? payload.comment?.getLocalizedLabel(User_1.Locale.RU) : null;
        this.value = 'id' in payload ? payload.id.toString() : payload.value;
    }
}
exports.RetrieveStatusDto = RetrieveStatusDto;
//# sourceMappingURL=retrieve-status.dto.js.map