import { IProductData, IProductEntity } from './@interfaces/product-entity.interface';

export default class ProductEntity implements IProductEntity {
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

  constructor({
    id,
    title,
    body_html,
    vendor,
    product_type,
    created_at,
    handle,
    updated_at,
    published_at,
    template_suffix,
    published_scope,
    tags,
  }: IProductData) {
    this.originId = id;
    this.title = title;
    this.bodyHtml = body_html;
    this.vendor = vendor;
    this.productType = product_type;
    this.originCreatedAt = created_at;
    this.handle = handle;
    this.originUpdatedAt = updated_at;
    this.publishedAt = published_at;
    this.templateSuffix = template_suffix;
    this.publishedScope = published_scope;
    this.tags = tags;
  }

  getArray(): any[] {
    return [
      this.originId,
      this.title,
      this.bodyHtml,
      this.vendor,
      this.productType,
      this.originCreatedAt,
      this.handle,
      this.originUpdatedAt,
      this.publishedAt,
      this.templateSuffix,
      this.publishedScope,
      this.tags,
    ];
  }
}
