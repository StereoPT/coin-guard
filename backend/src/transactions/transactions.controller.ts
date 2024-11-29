import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import {
  DeleteTransactionParamDTO,
  GetTransactionParamDTO,
  UpdateTransactionParamDTO,
} from './dto/transaction-params.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param() getTransactionParamDTO: GetTransactionParamDTO) {
    const { id } = getTransactionParamDTO;

    return {
      message: `Find Transaction with id: ${id}`,
    };
  }

  @Post()
  createOne(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionsService.createOne(createTransactionDTO);
  }

  @Put(':id')
  updateOne(@Param() updateTransactionParamDTO: UpdateTransactionParamDTO) {
    const { id } = updateTransactionParamDTO;

    return {
      message: `Update Transaction with id: ${id}`,
    };
  }

  @Delete()
  deleteAll() {
    return { message: 'Delete All Transactions' };
  }

  @Delete(':id')
  deleteOne(@Param() deleteTransactionParamDTO: DeleteTransactionParamDTO) {
    const { id } = deleteTransactionParamDTO;

    return {
      message: `Delete Transaction with id: ${id}`,
    };
  }
}
