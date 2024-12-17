export interface Product {
  id: string; // 产品ID
  name: string; // 产品名称
  company: {
    id: string; // 公司id
    name: string; // 公司名称
  };
  channel: {
    id: string; // 渠道ID
    name: string; // 渠道名称
  };
}
