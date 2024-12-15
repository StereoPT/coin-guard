import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Entity()
export class Transaction extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
  })
  date: Date;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.DEBIT,
  })
  type: TransactionType;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @Column({
    type: 'decimal',
  })
  balance: number;
}
