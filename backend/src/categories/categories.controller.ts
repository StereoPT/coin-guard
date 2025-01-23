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
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { NullableType } from 'src/types/nullable.type';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: Category['id']): Promise<NullableType<Category>> {
    const category = this.categoriesService.findById(id);
    return category;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    return this.categoriesService.create(createCategoryDTO);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: Category['id'],
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<NullableType<Category>> {
    return this.categoriesService.update(id, updateCategoryDTO);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAll(): Promise<void> {
    return this.categoriesService.deleteAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id') id: Category['id']): Promise<void> {
    return this.categoriesService.delete(id);
  }
}
