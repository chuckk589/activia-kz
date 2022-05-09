import { IsNumberString } from 'class-validator';

export class UpdateLotteryDto {
  @IsNumberString()
  status: string;
}
