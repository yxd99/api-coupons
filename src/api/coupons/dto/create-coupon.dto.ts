import { IsDateString, IsString, MinLength } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @MinLength(3)
  description: string;

  @IsDateString()
  expirationDate: Date;
}
