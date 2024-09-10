export interface IProductOptionSnakeCase {
  product_id: number;
  id: number;
  origin_id: number;
  origin_product_id: number;
  name: string;
  position: number;
  values: string[];
  created_at: string;
  updated_at: string;
}

export interface IProductOption {
  id: number;
  productId: number;
  originId: number;
  originProductId?: number;
  name: string;
  position: number;
  values: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductOptionEntity extends IProductOption {
  getArray: () => unknown[];
}
