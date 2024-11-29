import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  private readonly transactions = [];

  findAll() {
    return this.transactions;
  }

  createOne(transaction: CreateTransactionDTO) {
    this.transactions.push(transaction);
    return this.transactions;
  }
}
