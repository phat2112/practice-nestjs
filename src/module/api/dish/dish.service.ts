import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from '../../../entity/dish.entity';
import CommonError from '../../../lib/error';
import { Repository } from 'typeorm';

@Injectable()
export default class DishService {
  constructor(@InjectRepository(Dish) private dishRepo: Repository<Dish>) {}

  async findAll(): Promise<Dish[]> {
    try {
      const dishs = await this.dishRepo.find();
      if (!dishs) return [];
      return dishs;
    } catch (error) {
      throw error;
    }
  }

  async findById(dishId: number): Promise<Dish | null> {
    try {
      const dish = this.dishRepo.findOne(dishId);
      if (!dish) {
        throw new CommonError('Dish not found');
      }
      return dish;
    } catch (err) {
      throw err;
    }
  }

  async create(dish: Dish) {
    try {
      await this.dishRepo.insert(dish);
      return dish;
    } catch (err) {
      throw err;
    }
  }

  async update(user: Dish): Promise<Dish | null> {
    try {
      const dishFound = await this.dishRepo.findOne(user.dish_id);
      if (!dishFound) {
        throw new CommonError('No user found');
      }
      const newUser = await this.dishRepo.merge(dishFound, user);
      return await this.dishRepo.save(newUser);
    } catch (err) {
      throw err;
    }
  }
}
