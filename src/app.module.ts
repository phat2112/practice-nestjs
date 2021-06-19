import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './module/api/api.module';
import config from 'ormconfig';

@Module({
  imports: [
    MulterModule.register({
      dest: './public',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    ApiModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
