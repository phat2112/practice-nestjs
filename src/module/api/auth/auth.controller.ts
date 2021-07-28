import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
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
  async login(
    @Body() request: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.findUserByEmail(request.email);
    const token = await this.authService.getUserToken(user.user_id);
    user.password = undefined;
    return res.status(200).send({ data: { ...user, token } });
  }
}
