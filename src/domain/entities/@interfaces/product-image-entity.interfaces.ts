export interface IProductImageSnakeCase {
  product_id: number;
  origin_id: number;
  id: number;
  origin_product_id: number;
  position: number;
  origin_created_at: string;
  origin_updated_at: string;
  alt: string | null;
  width: number;
  height: number;
  src: string;
  origin_variant_ids: number[];
  variant_ids: number[];
  created_at: string;
  updated_at: string;
}

export interface IProductImage {
  productId: number;
  originId: number;
  originProductId: number;
  position: number;
  originCreatedAt: string;
  originUpdatedAt: string;
  alt: string | null;
  width: number;
  height: number;
  src: string;
  originVariantIds: number[];
}

export interface IProductImageEntity extends IProductImage {
  getArray: () => unknown[];
}
