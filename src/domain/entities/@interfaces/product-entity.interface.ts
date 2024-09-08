import { IProductImageData } from "./product-image-entity.interfaces";
import { IProductOptionData } from "./product-option-entity.interface";
import { IProductVariantData } from "./product-variant-entity.interfaces";

export interface IProductData {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: string;
  published_scope: string;
  tags: string;
}
  
  
export interface IProductDataComplete {
  product: IProductData & {
  variants: IProductVariantData[];
  options: IProductOptionData[];
  images: IProductImageData[];
  };
}

export interface IProduct {
  originId: number;
  title: string;
  bodyHtml: string;
  vendor: string;
  productType: string;
  originCreatedAt: string;
  handle: string;
  originUpdatedAt: string;
  publishedAt: string;
  templateSuffix: string;
  publishedScope: string;
  tags: string;
}

export interface IProductEntity extends IProduct {
  getArray: () => any[];
}