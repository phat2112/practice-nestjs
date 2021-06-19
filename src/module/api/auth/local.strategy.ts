import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../../entity/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordFiled: 'password',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return await this.authService.getAuthUser(email, password);
  }
}
