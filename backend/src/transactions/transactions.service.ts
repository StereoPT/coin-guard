import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';

import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { NullableType } from 'src/types/nullable.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    const foundTransactions = await this.transactionsRepository.find();
    return foundTransactions;
  }

  async findById(id: Transaction['id']): Promise<NullableType<Transaction>> {
    const foundTransaction = await this.transactionsRepository.findOneBy({
      id,
    });

    if (!foundTransaction) return null;

    return foundTransaction;
  }

  async create(transaction: CreateTransactionDTO): Promise<Transaction> {
    const newTransaction = await this.transactionsRepository.save(
      this.transactionsRepository.create(transaction),
    );

    return newTransaction;
  }

  async bulkCreate(
    transactions: CreateTransactionDTO[],
  ): Promise<Transaction[]> {
    const newTransactions = await this.transactionsRepository.save(
      this.transactionsRepository.create(transactions),
    );

    return newTransactions;
  }

  async update(
    id: Transaction['id'],
    updateTransaction: UpdateTransactionDTO,
  ): Promise<NullableType<Transaction>> {
    const foundTransaction = await this.transactionsRepository.findOneBy({
      id,
    });

    if (!foundTransaction) {
      throw new Error('Transaction not found!');
    }

    const updatedTransaction = await this.transactionsRepository.save(
      this.transactionsRepository.create({
        id,
        ...updateTransaction,
      }),
    );

    return updatedTransaction;
  }

  async deleteAll(): Promise<void> {
    await this.transactionsRepository.delete({});
  }

  async delete(id: Transaction['id']): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}
