import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { Products } from './Products.entity';
import { CooperationStatus, Company } from '../type';

@Entity('Partner')
export class Partner {
  /***
   * @uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /***
   * @string
   * 公司名
   */
  @Column('varchar')
  name: string;
  /***
   * @Date
   * 签约日期
   */
  @Column({ type: 'date', default: dayjs().format('YYYY-MM-DD') })
  contract_date: Date;

  /***
   * @enum
   * 当前合作状态
   */
  @Column({
    type: 'enum',
    enum: CooperationStatus,
    default: CooperationStatus.ACTIVE,
  })
  current_status: CooperationStatus;
  /***
   * @enum
   * 签约主体
   */
  @Column({
    type: 'enum',
    enum: Company,
    default: Company.SBJZ,
  })
  sign_compony: Company;
  /***
   * @OneToMany
   * 公司下属产品
   */
  @OneToMany(() => Products, (product) => product.company)
  products: Products[];
  /***
   * @string
   * 别名
   */
  @Column({ type: 'varchar', nullable: false })
  alias: string;
  /**
   * @string
   * 备注
   */
  @Column({ type: 'varchar', nullable: true })
  remark: string;
  /**
   * 软删除定义
   */
  @DeleteDateColumn()
  deletedAt: Date | null; // 软删除字段
}
