import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateTransactionDTO {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  debit?: number | null;

  @IsNumber()
  @IsOptional()
  @Min(0)
  credit?: number | null;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
