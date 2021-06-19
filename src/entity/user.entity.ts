import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
