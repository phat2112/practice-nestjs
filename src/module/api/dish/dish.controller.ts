import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Dish } from '../../../entity/dish.entity';
import CommonError from '../../../lib/error';
import DishService from './dish.service';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const dishs = await this.dishService.findAll();
      return res.status(200).send({ data: dishs });
    } catch (error) {
      if (error instanceof CommonError) {
        return res.status(error.code).send({ data: { error: error.message } });
      }
      return res.status(500).send({ data: { error: error.message } });
    }
  }

  @Get(':id')
  async get(@Param('id') id: number, @Res() res: Response) {
    try {
      const dish = await this.dishService.findById(id);
      return res.status(200).send({ data: dish });
    } catch (error) {
      if (error instanceof CommonError) {
        return res.status(error.code).send({ data: { error: error.message } });
      }
      return res.status(500).send({ data: { error: error.message } });
    }
  }

  @Post()
  async create(@Body() dish: Dish, @Res() res: Response): Promise<Response> {
    try {
      const newDish = await this.dishService.create(dish);
      return res.status(200).send({ data: newDish });
    } catch (error) {
      if (error instanceof CommonError) {
        return res.status(error.code).send({ data: { error: error.message } });
      }
      return res.status(500).send({ data: { error: error.message } });
    }
  }

  @Put()
  async update(@Body() dish: Dish, @Res() res: Response): Promise<Response> {
    try {
      const updatedDish = await this.dishService.update(dish);

      return res.status(200).send({ data: updatedDish });
    } catch (err) {
      if (err instanceof CommonError) {
        return res.status(err.code).send({ data: { err: err.message } });
      }
      return res.status(500).send({ data: { err: err.message } });
    }
  }
}
