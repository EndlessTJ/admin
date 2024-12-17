import { CooperationStatus, Company } from '../../type';
import { ProductsDto } from './products.dto';

export class PartnerChannelDto {
  name: string;
  contract_date: Date;
  current_status: CooperationStatus;
  sign_compony: Company;
  products?: ProductsDto[];
  alias?: string;
  remark?: string;
}
