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
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly debit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly credit?: number;

  @IsNumber()
  @IsNotEmpty()
  readonly balance: number;
}
