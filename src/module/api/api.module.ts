import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Dish } from '../../entity/dish.entity';
import { GroupOrder } from '../../entity/group-order.entity';
import { User } from '../../entity/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import UserService from './user/user.service';
import DishService from './dish/dish.service';
import { UserController } from './user/user.controller';
import { DishController } from './dish/dish.controller';
import { AuthController } from '../api/auth/auth.controller';
import { GroupOrderController } from './group-order/group-order.controller';
import GroupOrderService from './group-order/group-order.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User, Dish, GroupOrder]),
    PassportModule,
  ],
  controllers: [
    AuthController,
    UserController,
    DishController,
    GroupOrderController,
  ],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    DishService,
    GroupOrderService,
  ],
})
export class ApiModule {}
