import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne() {
    return { message: 'Find One Transaction' };
  }

  @Post()
  createOne() {
    return this.transactionsService.createOne('Transaction 1');
  }

  @Put(':id')
  updateOne() {
    return { message: 'Update One Transaction' };
  }

  @Delete()
  deleteAll() {
    return { message: 'Delete All Transactions' };
  }

  @Delete(':id')
  deleteOne() {
    return { message: 'Delete One Transaction' };
  }
}
