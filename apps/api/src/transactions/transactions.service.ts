import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  private readonly transactions = [];

  findAll() {
    return this.transactions;
  }

  createOne(transaction) {
    this.transactions.push(transaction);
    return this.transactions;
  }
}
