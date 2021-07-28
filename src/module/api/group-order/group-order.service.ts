import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupOrder } from '../../../entity/group-order.entity';
import { Dish } from '../../../entity/dish.entity';

@Injectable()
export default class GroupOrderService {
  constructor(
    @InjectRepository(GroupOrder) private groupRepo: Repository<GroupOrder>,
  ) {}

  async findByHostId(host_id: string): Promise<any> {
    try {
      return await this.groupRepo
        .createQueryBuilder('group_order')
        .where('group_order.host_id = :host_id', { host_id })
        .leftJoinAndMapOne(
          'group_order.dish',
          Dish,
          'dish',
          'group_order.dish_id = dish.dish_id',
        )
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async create(groupOrder: GroupOrder): Promise<GroupOrder> {
    try {
      console.log('groupOrder service :>> ', groupOrder);
      return await this.groupRepo.save(groupOrder);
    } catch (error) {
      throw error;
    }
  }
}
