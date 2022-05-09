import { CheckStatus } from 'src/modules/mikroorm/entities/CheckStatus';
import { City } from 'src/modules/mikroorm/entities/City';
import { LotteryStatus } from 'src/modules/mikroorm/entities/LotteryStatus';
import { Prize } from 'src/modules/mikroorm/entities/Prize';
import { Promo } from 'src/modules/mikroorm/entities/Promo';
import { Locale, User } from 'src/modules/mikroorm/entities/User';

export class RetrieveStatusDto {
  constructor(
    payload: Promo | City | Prize | LotteryStatus | CheckStatus | { id?: number; label?: string; value: string },
  ) {
    //this.id = payload.id;
    this.label = 'translation' in payload ? payload.translation.getLocalizedLabel(Locale.RU) : payload.label;
    //this.value = 'name' in payload ? payload.name : payload.value;
    this.comment = 'comment' in payload ? payload.comment?.getLocalizedLabel(Locale.RU) : null;
    this.value = 'id' in payload ? payload.id.toString() : payload.value;
  }
  label: string;
  //id: number;
  //value: string;
  // is actually id of the entity or value of Locale or UserRole
  value: string;
  comment?: string;
}
