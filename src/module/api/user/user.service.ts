import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entity/user.entity';

@Injectable()
export default class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ email });
      if (!user) {
        throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(user: User) {
    try {
      const newUser = await this.userRepo.create(user);
      await this.userRepo.save(newUser);
      return newUser;
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async getById(id: string) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
