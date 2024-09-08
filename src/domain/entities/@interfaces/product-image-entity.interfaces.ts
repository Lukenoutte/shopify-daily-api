export interface IProductImageData {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: string | null;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}

export interface IProductImage {
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
  getArray: () => any[];
}
