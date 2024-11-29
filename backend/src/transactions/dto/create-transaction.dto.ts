import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDTO {
  @IsDateString()
  @IsNotEmpty()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsOptional()
  readonly debit?: number;

  @IsNumber()
  @IsOptional()
  readonly credit?: number;

  @IsNumber()
  @IsNotEmpty()
  readonly balance: number;
}
