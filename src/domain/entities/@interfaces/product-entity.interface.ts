/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProductImage } from "./product-image-entity.interfaces";
import { IProductOption } from "./product-option-entity.interface";
import { IProductVariant } from "./product-variant-entity.interfaces";

export interface IProductSnakeCase {
  id: number;
  origin_id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  origin_created_at: string;
  handle: string;
  origin_updated_at: string;
  published_at: string;
  template_suffix: string;
  published_scope: string;
  tags: string;
  created_at: string;
  updated_at: string;
  images: any[];
  options: any[];
  variants: any[];
}

export interface IProduct {
  id: number;
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
  createdAt: string;
  updatedAt: string;
}

export interface IProductEntity extends IProduct {
  getArray: () => unknown[];
}

export interface IProductResponse extends IProduct {
  images: IProductImage[];
  options: IProductOption[];
  variants: IProductVariant[];
}
