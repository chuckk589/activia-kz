"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrievePrizeValueDto = void 0;
class RetrievePrizeValueDto {
    constructor(prize) {
        this.id = prize.id;
        this.qr_payload = prize.qr_payload;
        this.prizeId = prize.prize.id;
    }
}
exports.RetrievePrizeValueDto = RetrievePrizeValueDto;
//# sourceMappingURL=retrieve-prize-value.dto.js.map