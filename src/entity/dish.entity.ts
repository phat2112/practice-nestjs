import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GroupOrder } from './group-order.entity';
import { User } from './user.entity';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  dish_id: number;

  @Column({ length: 100 })
  dish_name!: string;

  @Column({ length: 500 })
  dish_address!: string;

  @Column()
  dish_price!: number;

  @ManyToOne(() => GroupOrder, (groupOrder) => groupOrder.dish, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'order' }])
  groupOrder: GroupOrder;
}
