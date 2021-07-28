import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class UserFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id!: string;

  @Column()
  friend_id!: string;

  @ManyToOne(() => User, (user) => user.userFriend, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user' }])
  user: User;
}
