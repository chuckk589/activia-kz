import { Lottery } from 'src/modules/mikroorm/entities/Lottery';
import { Locale } from 'src/modules/mikroorm/entities/User';
import { Winner } from 'src/modules/mikroorm/entities/Winner';

export class RetrieveLotteryDto {
  constructor(lottery: Lottery) {
    this.id = lottery.id;
    this.start = lottery.start.toLocaleString();
    this.end = lottery.end.toLocaleString();
    this.status = lottery.status.translation.getLocalizedLabel(Locale.RU);
    this.prize = lottery.prize.translation.getLocalizedLabel(Locale.RU);
    this.primaryWinners = lottery.primaryWinners;
    this.reserveWinners = lottery.reserveWinners;
    this.createdAt = lottery.createdAt.toLocaleString();
    this.winners = lottery.winners.getItems().map((winner) => new RetrieveWinnerDto(winner));
  }
  id: number;
  start: string;
  end: string;
  status: string;
  prize: string;
  primaryWinners: number;
  reserveWinners: number;
  createdAt: string;
  winners: RetrieveWinnerDto[];
}
class RetrieveWinnerDto {
  constructor(winner: Winner) {
    this.id = winner.id;
    this.confirmed = winner.confirmed;
    this.notified = winner.notified;
    this.fancyId = winner.check.fancyId;
    this.credentials = winner.check.user.credentials;
    this.phone = winner.check.user.phone;
    this.city = winner.check.user.city.translation.getLocalizedLabel(Locale.RU);
    this.checkPath = winner.check.path;
    this.primary = winner.primary;
  }
  id: number;
  confirmed: boolean;
  notified: boolean;
  primary: boolean;
  fancyId: string;
  credentials: string;
  phone: string;
  city: string;
  checkPath: string;
}
