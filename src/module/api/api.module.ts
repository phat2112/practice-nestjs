import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../../entity/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { AuthController } from '../api/auth/auth.controller';
import UserService from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
})
export class ApiModule {}
