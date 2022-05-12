"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveLotteryDto = void 0;
const User_1 = require("../../mikroorm/entities/User");
class RetrieveLotteryDto {
    constructor(lottery) {
        this.id = lottery.id;
        this.start = lottery.start.toLocaleString();
        this.end = lottery.end.toLocaleString();
        this.status = lottery.status.translation.getLocalizedLabel(User_1.Locale.RU);
        this.prize = lottery.prize.translation.getLocalizedLabel(User_1.Locale.RU);
        this.primaryWinners = lottery.primaryWinners;
        this.reserveWinners = lottery.reserveWinners;
        this.createdAt = lottery.createdAt.toLocaleString();
        this.winners = lottery.winners.getItems().map((winner) => new RetrieveWinnerDto(winner));
    }
}
exports.RetrieveLotteryDto = RetrieveLotteryDto;
class RetrieveWinnerDto {
    constructor(winner) {
        this.id = winner.id;
        this.confirmed = winner.confirmed;
        this.notified = winner.notified;
        this.fancyId = winner.check.fancyId;
        this.credentials = winner.check.user.credentials;
        this.phone = winner.check.user.phone;
        this.city = winner.check.user.city.translation.getLocalizedLabel(User_1.Locale.RU);
        this.checkPath = winner.check.path;
        this.primary = winner.primary;
    }
}
//# sourceMappingURL=retrieve-lottery.dto.js.map