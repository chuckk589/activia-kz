import { Check } from 'src/modules/mikroorm/entities/Check';
import { Locale, User } from 'src/modules/mikroorm/entities/User';

export class RetrieveCheckDto {
  constructor(check: Check) {
    this.id = check.id;
    this.fancyId = check.fancyId;
    this.credentials = check.user.credentials;
    this.phone = check.user.phone;
    this.city = check.user.city.translation.getLocalizedLabel(Locale.RU);
    this.checkPath = check.path;
    this.createdAt = check.createdAt.toLocaleString();
    this.status = check.status.comment
      ? check.status.comment.getLocalizedLabel(Locale.RU)
      : check.status.translation.getLocalizedLabel(Locale.RU);
  }
  id: number;
  fancyId: string;
  credentials: string;
  phone: string;
  city: string;
  status: string;
  createdAt: string;
  checkPath: string;
}
