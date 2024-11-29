import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetTransactionParamDTO {
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class UpdateTransactionParamDTO {
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class DeleteTransactionParamDTO {
  @IsInt()
  @Type(() => Number)
  id: number;
}
