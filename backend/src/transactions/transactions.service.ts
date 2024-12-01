import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  public async findAll() {
    const transactions = await this.transactionsRepository.find();
    return transactions;
  }

  public async findOne(id: number) {
    const transaction = await this.transactionsRepository.findOneBy({ id });

    if (!transaction) throw new NotFoundException();

    return transaction;
  }

  public async createOne(transaction: CreateTransactionDTO) {
    let newTransaction = this.transactionsRepository.create(transaction);
    newTransaction = await this.transactionsRepository.save(newTransaction);

    return newTransaction;
  }

  public async updateOne(id: number, updateTransaction: UpdateTransactionDTO) {
    await this.findOne(id);
    const updatedTransaction = await this.transactionsRepository.save({
      id,
      ...updateTransaction,
    });

    return updatedTransaction;
  }

  public async deleteAll() {
    const deletedRows = await this.transactionsRepository.delete({});
    return deletedRows.affected;
  }

  public async deleteOne(id: number) {
    const deletedRow = await this.transactionsRepository.delete({ id });
    return deletedRow.affected;
  }
}
