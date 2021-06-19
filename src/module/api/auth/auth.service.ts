import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import UserService from '../user/user.service';
import { User } from '../../../entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: User) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Password is not matching...',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (err) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserToken(userId: string) {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }
}
