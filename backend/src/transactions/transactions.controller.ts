import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { NullableType } from 'src/types/nullable.type';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Transaction[]> {
    const transactions = this.transactionsService.findAll();
    return transactions;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id') id: Transaction['id'],
  ): Promise<NullableType<Transaction>> {
    const transaction = this.transactionsService.findById(id);
    return transaction;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTransactionDTO: CreateTransactionDTO,
  ): Promise<Transaction> {
    return this.transactionsService.create(createTransactionDTO);
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  bulkCreate(
    @Body(new ParseArrayPipe({ items: CreateTransactionDTO }))
    bulkCreateTransactionsDTO: CreateTransactionDTO[],
  ): Promise<Transaction[]> {
    return this.transactionsService.bulkCreate(bulkCreateTransactionsDTO);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: Transaction['id'],
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ): Promise<NullableType<Transaction>> {
    return this.transactionsService.update(id, updateTransactionDTO);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAll() {
    return this.transactionsService.deleteAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id') id: Transaction['id']) {
    return this.transactionsService.delete(id);
  }
}
