import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import {
  DeleteTransactionParamDTO,
  GetTransactionParamDTO,
  UpdateTransactionParamDTO,
} from './dto/transaction-params.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';

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
    return this.transactionsService.findOne(id);
  }

  @Post()
  createOne(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionsService.createOne(createTransactionDTO);
  }

  @Patch(':id')
  updateOne(
    @Param() updateTransactionParamDTO: UpdateTransactionParamDTO,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ) {
    const { id } = updateTransactionParamDTO;
    return this.transactionsService.updateOne(id, updateTransactionDTO);
  }

  @Delete()
  deleteAll() {
    return this.transactionsService.deleteAll();
  }

  @Delete(':id')
  deleteOne(@Param() deleteTransactionParamDTO: DeleteTransactionParamDTO) {
    const { id } = deleteTransactionParamDTO;
    return this.transactionsService.deleteOne(id);
  }
}
