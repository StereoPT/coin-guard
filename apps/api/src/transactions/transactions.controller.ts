import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';

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
  createOne(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionsService.createOne(createTransactionDTO);
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
