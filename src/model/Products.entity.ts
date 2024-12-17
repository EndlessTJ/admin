import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm';
import { Partner } from './Partner.entity';
import { Channel } from './Channel.entity';

@Entity('Products')
export class Products {
  /***
   * @uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /***
   * @string
   * 产品名称
   */
  @Column('varchar')
  name: string;
  /***
   * @OneToMany
   * 产品所属公司名称
   */
  @ManyToOne(() => Partner, (company) => company.products)
  company: Partner;
  /***
   * @ManyToMany
   * 推广产品的渠道
   */
  @ManyToMany(() => Channel, (channel) => channel.products)
  @JoinTable()
  channel: Channel[];
  /**
   * 软删除定义
   */
  @DeleteDateColumn()
  deletedAt: Date | null; // 软删除字段
}
