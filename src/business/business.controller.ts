import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ProductsDto } from './dto/products.dto';
import { PartnerChannelDto } from './dto/partner-channel.dto';
// import { Product } from './interfaces/product.interface';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}
  // 产品模块操作

  // 新增产品
  @Post('products')
  createProducts(@Body() product: ProductsDto): void {
    try {
      this.businessService.createProduct(product);
    } catch (error) {
      console.error(error);
    }
  }

  // 修改产品
  @Put('products/:id')
  updateProducts(@Body() product: ProductsDto, @Param('id') id: string) {
    try {
      this.businessService.updateProduct(id, product);
    } catch (error) {
      console.error(error);
    }
  }

  // 产看产品列表
  @Get('products')
  async findProducts() {
    return await this.businessService.findProducts();
  }

  //软删除产品
  @Put('products/del/:id')
  deleteProduts(@Param('id') id: string): void {
    try {
      this.businessService.deleteProduts(id);
    } catch (error) {
      console.error(error);
    }
  }

  // 公司模块操作
  @Post('partner')
  createPartner(@Body() partner: PartnerChannelDto): void {
    try {
      // console.log(partner);
      this.businessService.createPartner(partner);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('partner')
  findPartners() {
    return this.businessService.findPartners();
  }

  // 修改公司信息
  @Put('partner/:id')
  updatePartners(@Body() partner: PartnerChannelDto, @Param('id') id: string) {
    try {
      this.businessService.updatePartners(id, partner);
    } catch (error) {
      console.error(error);
    }
  }

  // 信息软删除
  @Put('partner/del/:id')
  deletePartner(@Param('id') id: string) {
    try {
      this.businessService.deletePartner(id);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Channel的操作
   */
  @Post('channel')
  createChannel(@Body() channel: PartnerChannelDto): void {
    try {
      this.businessService.createChannel(channel);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('channel')
  findChannels() {
    return this.businessService.findChannel();
  }

  // 修改公司信息
  @Put('channel/:id')
  updateChannel(@Body() channel: PartnerChannelDto, @Param('id') id: string) {
    try {
      this.businessService.updateChannel(id, channel);
    } catch (error) {
      console.error(error);
    }
  }

  // 信息软删除
  @Put('channel/del/:id')
  deleteChannel(@Param('id') id: string) {
    try {
      this.businessService.deleteChannel(id);
    } catch (error) {
      console.error(error);
    }
  }
}
