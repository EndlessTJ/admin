import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Products } from './model/Products.entity';
import { Channel } from './model/Channel.entity';
import { BusinessPlans } from './model/BusinessPlans.entity';
import { Partner } from './model/Partner.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: process.env.NODE_ENV === 'development',
        entities: [Products, Channel, BusinessPlans, Partner],
        // extra: {
        //   createDatabaseIfNotExist: true, // MySQL 特定选项，自动创建数据库
        // },
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'Simbol@8888',
    //   database: 'test_db',
    //   entities: [Products, Channel, BusinessPlans, Partner],
    //   synchronize: true, // 生产环境删除
    //   extra: {
    //     createDatabaseIfNotExist: true, // MySQL 特定选项，自动创建数据库
    //   },
    // }),
    BusinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
