import { Body, Controller, Get, Post, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import GroupOrderService from './group-order.service';
import { GroupOrder } from '../../../entity/group-order.entity';
import CommonError from '../../../lib/error';

@Controller('groupOrder')
export class GroupOrderController {
  constructor(private readonly groupOrderService: GroupOrderService) {}

  @Get(':id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const groupOrders = await this.groupOrderService.findByHostId(id);
      if (!groupOrders)
        res.status(404).send({ data: { error: 'Order not found' } });
      res.status(200).send({
        data: {
          host: id,
          groupOrders,
        },
      });
    } catch (error) {
      if (error instanceof CommonError) {
        return res.status(error.code).send({ data: { error: error.message } });
      }
      return res.status(500).send({ data: { error: error.message } });
    }
  }

  @Post()
  async create(
    @Body() groupOrders: { groupOrders: GroupOrder[] },
    @Res() res: Response,
  ) {
    try {
      console.log('groupOrders :>> ', groupOrders);
      if (groupOrders.groupOrders.length) {
        groupOrders.groupOrders.forEach((item) => {
          this.groupOrderService.create(item);
        });
      }
      return res.status(200).send({ data: { isRegister: true } });
    } catch (error) {
      if (error instanceof CommonError) {
        return res.status(error.code).send({ data: { error: error.message } });
      }
      return res.status(500).send({ data: { error: error.message } });
    }
  }
}
