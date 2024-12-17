import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Products } from './Products.entity';
import { Channel } from './Channel.entity';

enum Status {
  draft = '待上线',
  active = '已上线',
  archived = '已下线',
}

enum PricingType {
  CPC = '点击计价',
  CPA = '领取计价',
  CPS = '下单计价',
  CPM = '曝光计价',
}

@Entity('Business_Plans')
export class BusinessPlans {
  /***
   * @uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /***
   * @string
   * 计划名称
   */
  @Column('varchar')
  name: string;
  /***
   * @Enmu
   * 计划状态
   */
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.draft,
  })
  status: Status;
  /***
   * @Date
   * 计划创建时间
   */
  @CreateDateColumn()
  create_at: Date;
  /***
   * @Date
   * 计划更新时间
   */
  @UpdateDateColumn()
  update_at: Date;
  /***
   * @Date
   * 计划开始时间
   */
  @Column('datetime')
  start_date: Date;
  /***
   * @Date
   * 计划结束时间
   */
  @Column('datetime')
  end_date: Date;
  /***
   * @int
   * 计划是否被删除
   */
  @Column({
    type: 'tinyint',
    default: 0,
  })
  is_deleted: number;
  /**
   * @ManyToOne
   * 所属产品
   */
  @ManyToOne(() => Products, { nullable: false, onDelete: 'RESTRICT' })
  product: Products;
  /**
   * @ManyToOne
   * 投放渠道
   */
  @ManyToOne(() => Channel, { nullable: false, onDelete: 'RESTRICT' })
  channel: Channel;
  /**
   * @string
   * 计划描述
   */
  @Column('varchar')
  description: string;
  /**
   * @
   * 计划单价
   */
  @Column('int')
  cost: number;
  /**
   * @enum
   * 计划计价类型
   */
  @Column({
    type: 'enum',
    enum: PricingType,
    default: PricingType.CPA,
  })
  pricingType: PricingType;
  /**
   * 软删除定义
   */
  @DeleteDateColumn()
  deletedAt: Date | null; // 软删除字段
}
