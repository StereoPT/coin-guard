import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  public async findAll() {
    const transactions = this.transactionsRepository.find();
    return transactions;
  }

  public async createOne(transaction: CreateTransactionDTO) {
    let newTransaction = this.transactionsRepository.create(transaction);
    newTransaction = await this.transactionsRepository.save(newTransaction);

    return newTransaction;
  }
}
