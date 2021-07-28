import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dish } from './dish.entity';
import { User } from './user.entity';

@Entity()
export class GroupOrder {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column('varchar', { name: 'host_id' })
  host_id: string;

  @Column('varchar', { name: 'user_id' })
  user_id: string;

  @Column('int', { name: 'dish_id' })
  dish_id: number;

  @ManyToOne(() => User, (user) => user.groupOrder, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user' }])
  user: User;

  @OneToMany(() => Dish, (dish) => dish.groupOrder)
  dish: Dish[];
}
