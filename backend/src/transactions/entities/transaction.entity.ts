import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'money',
    nullable: true,
  })
  debit?: number;

  @Column({
    type: 'money',
    nullable: true,
  })
  credit?: number;

  @Column({
    type: 'money',
    nullable: false,
  })
  balance: number;
}
