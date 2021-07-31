import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './module/api/api.module';
import { AppGateway } from './app.gateway';
import config from 'ormconfig';

@Module({
  imports: [
    MulterModule.register({
      dest: './public',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
