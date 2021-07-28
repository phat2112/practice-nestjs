import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupOrder } from './group-order.entity';
import { UserFriend } from './user-friend.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column({ length: 50 })
  user_name!: string;

  @Column({ length: 254 })
  email!: string;

  @Column({ length: 500 })
  password!: string;

  @OneToMany(() => GroupOrder, (groupOrder) => groupOrder.user)
  groupOrder: GroupOrder[];

  @OneToMany(() => UserFriend, (userFriend) => userFriend.user)
  userFriend: UserFriend[];
}
