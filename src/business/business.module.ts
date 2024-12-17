import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/model/Partner.entity';
import { Channel } from 'src/model/Channel.entity';
import { Products } from 'src/model/Products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner, Channel, Products]), // 在 BusinessModule 注册实体
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
