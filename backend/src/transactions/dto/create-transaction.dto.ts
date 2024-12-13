import { Transform } from 'class-transformer';
import { IsCurrency, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsDateFormat } from 'src/common/validators/custom-date.validator';

export class CreateTransactionDTO {
  @IsDateFormat()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  description: string;

  @IsCurrency({
    require_symbol: false,
    allow_decimal: true,
  })
  @IsOptional()
  debit?: number | null;

  @IsCurrency({
    require_symbol: false,
    allow_decimal: true,
  })
  @IsOptional()
  credit?: number | null;

  @IsCurrency({
    require_symbol: false,
    allow_decimal: true,
  })
  @IsNotEmpty()
  balance: number;
}
