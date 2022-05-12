import { IsNumberString } from 'class-validator';

export class UpdateWinnerDto {
  @IsNumberString()
  confirmed: string;
}
