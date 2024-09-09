export interface IProductOptionData {
  ref_product_id?: number;
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface IProductOption {
  productId?: number;
  originId: number;
  originProductId: number;
  name: string;
  position: number;
  values: string[];
}

export interface IProductOptionEntity extends IProductOption {
  getArray: () => unknown[];
}
