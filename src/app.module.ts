import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ExistValidator } from './etc/validator/exist-validator';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        type: 'mariadb',
        // host: process.env.MYSQL_HOST,
        // port: parseInt(process.env.MYSQL_PORT),
        // username: process.env.MYSQL_USER,
        // password: process.env.MYSQL_PASS,
        // database: process.env.MYSQL_DB,
        entities: [
          User
        ],
        synchronize: true,
        debug: true,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'enigmashop',
      }
    ),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
