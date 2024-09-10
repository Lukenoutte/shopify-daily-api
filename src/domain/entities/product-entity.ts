import {
  IProductSnakeCase,
  IProductEntity,
  IProductResponse,
} from "./@interfaces/product-entity.interface";
import { IProductImage } from "./@interfaces/product-image-entity.interfaces";
import { IProductOption } from "./@interfaces/product-option-entity.interface";
import { IProductVariant } from "./@interfaces/product-variant-entity.interfaces";

export default class ProductEntity implements IProductEntity {
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
  images: IProductImage[];
  options: IProductOption[];
  variants: IProductVariant[];
  createdAt: string;
  updatedAt: string;

  constructor({
    id,
    origin_id,
    title,
    body_html,
    vendor,
    product_type,
    handle,
    origin_created_at,
    origin_updated_at,
    published_at,
    template_suffix,
    published_scope,
    tags,
    created_at,
    updated_at,
    images,
    options,
    variants,
  }: IProductSnakeCase) {
    this.id = id;
    this.originId = origin_id;
    this.title = title;
    this.bodyHtml = body_html;
    this.vendor = vendor;
    this.productType = product_type;
    this.handle = handle;
    this.originCreatedAt = origin_created_at;
    this.originUpdatedAt = origin_updated_at;
    this.publishedAt = published_at;
    this.templateSuffix = template_suffix;
    this.publishedScope = published_scope;
    this.tags = tags;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.images = images;
    this.options = options;
    this.variants = variants;
  }

  getArray(): unknown[] {
    return [
      this.originId,
      this.title,
      this.bodyHtml,
      this.vendor,
      this.productType,
      this.handle,
      this.originCreatedAt,
      this.originUpdatedAt,
      this.publishedAt,
      this.templateSuffix,
      this.publishedScope,
      this.tags,
    ];
  }

  getObject(): IProductResponse {
    return {
      id: this.id,
      originId: this.originId,
      title: this.title,
      bodyHtml: this.bodyHtml,
      vendor: this.vendor,
      productType: this.productType,
      handle: this.handle,
      originCreatedAt: this.originCreatedAt,
      originUpdatedAt: this.originUpdatedAt,
      publishedAt: this.publishedAt,
      templateSuffix: this.templateSuffix,
      publishedScope: this.publishedScope,
      tags: this.tags,
      images: this.images,
      options: this.options,
      variants: this.variants,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
