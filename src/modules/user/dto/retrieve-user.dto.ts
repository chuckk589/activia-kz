import { Locale, User } from 'src/modules/mikroorm/entities/User';

export class RetrieveUserDto {
  constructor(user: User) {
    this.id = user.id;
    this.chatId = user.chatId;
    this.username = user.username;
    this.credentials = user.credentials;
    this.locale = user.locale;
    this.role = user.role;
    this.phone = user.phone;
    this.promo = user.promo?.translation?.getLocalizedLabel(Locale.RU) || null;
    this.createdAt = user.createdAt.toLocaleString();
    this.city = user.city?.translation?.getLocalizedLabel(Locale.RU) || null;
    this.registered = user.registered;
  }
  id: number;
  chatId: string;
  username: string;
  credentials: string;
  locale: string;
  role: string;
  phone: string;
  registered: boolean;
  city: string;
  promo: string;
  createdAt: string;
}
