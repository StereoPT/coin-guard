import { IsNumberString, IsOptional } from 'class-validator';

export class GetTransactionsQueryDTO {
  @IsNumberString()
  @IsOptional()
  month: number;
}
