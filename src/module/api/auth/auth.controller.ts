import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../../entity/user.entity';
import { LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: User) {
    return await this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() request: User) {
    const user = request;
    const token = await this.authService.getUserToken(user.user_id);
    user.password = undefined;
    return { ...user, token };
  }
}
