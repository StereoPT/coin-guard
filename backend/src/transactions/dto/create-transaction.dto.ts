import { Transform } from 'class-transformer';
import { IsCurrency, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsDateFormat } from 'src/common/validators/custom-date.validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDTO {
  @IsDateFormat()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsCurrency({
    require_symbol: false,
    allow_decimal: true,
  })
  @IsNotEmpty()
  amount: number;

  @IsCurrency({
    require_symbol: false,
    allow_decimal: true,
  })
  @IsNotEmpty()
  balance: number;
}
