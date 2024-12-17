import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
// import { Business } from './interfaces/business.interface';
import { PartnerChannelDto } from './dto/partner-channel.dto';
import { ProductsDto } from './dto/products.dto';
import { Partner } from '../model/Partner.entity';
import { Channel } from '../model/Channel.entity';
import { Products } from '../model/Products.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  /**
   * 对产品表的操作
   */
  async createProduct(products: ProductsDto) {
    try {
      const { name, companyId, channelIds } = products;

      // 1. 查找公司
      const company = await this.partnerRepository.findOne({
        where: { id: companyId },
      });
      if (!company) {
        throw new Error('Company not found');
      }
      // 2. 查找渠道
      const channels = await this.channelRepository.findBy({
        id: In(channelIds),
      });
      if (channels.length !== channelIds.length) {
        throw new Error('Some channels not found');
      }
      if (!name) {
        throw new Error('name not found');
      }
      // 3. 创建并保存产品
      const product = this.productsRepository.create({
        name,
        company,
        channel: channels,
      });

      return await this.productsRepository.save(product);
    } catch (error) {
      console.error(error);
    }
  }
  // 修改产品
  async updateProduct(id: string, productDto: ProductsDto) {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: id },
        relations: ['company', 'channel'],
      });
      if (!product) {
        throw new Error('Product not found');
      }
      const { name, companyId, channelIds } = productDto;
      const newCompany = await this.partnerRepository.findOne({
        where: { id: companyId },
      });
      if (!newCompany) {
        throw new Error('Company not found');
      }
      // 查询新渠道
      const newChannels = await this.channelRepository.findBy({
        id: In(channelIds),
      });
      if (newChannels.length !== channelIds.length) {
        throw new Error('Some channels not found');
      }
      if (name) {
        product.name = name;
      }
      product.company = newCompany;
      product.channel = newChannels;
      return await this.productsRepository.save(product);
    } catch (error) {
      console.error(error);
    }
  }
  // 查询产品
  async findProducts() {
    return await this.productsRepository.find({
      relations: ['company', 'channel'],
    });
  }

  // 软删除产品
  async deleteProduts(id: string) {
    this.productsRepository.softDelete(id);
  }

  async createPartner(partner: PartnerChannelDto) {
    try {
      await this.partnerRepository.save(partner);
    } catch (error) {
      console.error(error);
    }
  }

  async findPartners() {
    const obj = await this.partnerRepository.find();
    return obj;
  }

  async updatePartners(id: string, partner: PartnerChannelDto) {
    try {
      await this.partnerRepository.update(id, partner);
    } catch (error) {
      console.error(error);
    }
  }

  // 删除公司信息
  async deletePartner(id: string) {
    try {
      this.partnerRepository.softDelete(id);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Channel 操作方法
   */

  // 创建channel
  async createChannel(channel: PartnerChannelDto) {
    try {
      await this.channelRepository.save(channel);
    } catch (error) {
      console.error(error);
    }
  }
  async findChannel() {
    const obj = await this.channelRepository.find();
    return obj;
  }

  async updateChannel(id: string, channel: PartnerChannelDto) {
    try {
      await this.channelRepository.update(id, channel);
    } catch (error) {
      console.error(error);
    }
  }

  // 删除公司信息
  async deleteChannel(id: string) {
    try {
      this.channelRepository.softDelete(id);
    } catch (error) {
      console.error(error);
    }
  }
}
