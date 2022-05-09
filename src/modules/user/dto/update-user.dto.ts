import { IsEnum, IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Locale, UserRole } from 'src/modules/mikroorm/entities/User';

export class UpdateUserDto {
  @IsOptional()
  @IsNumberString()
  city?: string;

  @IsOptional()
  @IsString()
  credentials?: string;

  @IsOptional()
  @IsEnum(Locale)
  locale?: Locale;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsIn([0, 1])
  registered?: number;

  @IsOptional()
  @IsNumberString()
  promo?: string;
}
