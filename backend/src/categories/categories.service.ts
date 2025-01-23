import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';

import { UpdateCategoryDTO } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { NullableType } from 'src/types/nullable.type';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const foundCategories = await this.categoriesRepository.find({
      order: { name: 'DESC' },
    });

    return foundCategories;
  }

  async findById(id: Category['id']): Promise<NullableType<Category>> {
    const foundCategory = await this.categoriesRepository.findOneBy({ id });

    if (!foundCategory) throw new NotFoundException();

    return foundCategory;
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    const newCategory = await this.categoriesRepository.save(
      this.categoriesRepository.create(category),
    );

    return newCategory;
  }

  async update(
    id: Category['id'],
    updateCategory: UpdateCategoryDTO,
  ): Promise<NullableType<Category>> {
    const foundCategory = await this.categoriesRepository.findOneBy({ id });

    if (!foundCategory) {
      throw new NotFoundException();
    }

    const updatedCategory = await this.categoriesRepository.save(
      this.categoriesRepository.merge(foundCategory, updateCategory),
    );

    return updatedCategory;
  }

  async deleteAll(): Promise<void> {
    await this.categoriesRepository.delete({});
  }

  async delete(id: Category['id']): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
