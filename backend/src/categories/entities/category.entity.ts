import { Transaction } from 'src/transactions/entities/transaction.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  color: string;

  @OneToMany(() => Transaction, (transaction) => transaction.id, {
    nullable: true,
    cascade: true,
  })
  transactions: Transaction[];
}
