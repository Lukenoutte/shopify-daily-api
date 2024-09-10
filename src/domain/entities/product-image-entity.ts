import {
  IProductImageSnakeCase,
  IProductImageEntity,
} from "./@interfaces/product-image-entity.interfaces";

export default class ProductImageEntity implements IProductImageEntity {
  id: number;
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
  createdAt: string;
  updatedAt: string;

  constructor({
    id,
    product_id,
    origin_id,
    origin_product_id,
    position,
    origin_created_at,
    origin_updated_at,
    alt,
    width,
    height,
    src,
    origin_variant_ids,
    created_at,
    updated_at,
  }: IProductImageSnakeCase) {
    this.id = id;
    this.productId = product_id;
    this.originId = origin_id;
    this.originProductId = origin_product_id;
    this.position = position;
    this.originCreatedAt = origin_created_at;
    this.originUpdatedAt = origin_updated_at;
    this.alt = alt;
    this.width = width;
    this.height = height;
    this.src = src;
    this.originVariantIds = origin_variant_ids;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  getArray(): unknown[] {
    return [
      this.productId,
      this.originId,
      this.originProductId,
      this.position,
      this.originCreatedAt,
      this.originUpdatedAt,
      this.alt,
      this.width,
      this.height,
      this.src,
      this.originVariantIds,
    ];
  }

  getObject() {
    return {
      id: this.id,
      productId: this.productId,
      originId: this.originId,
      originProductId: this.originProductId,
      position: this.position,
      originCreatedAt: this.originCreatedAt,
      originUpdatedAt: this.originUpdatedAt,
      alt: this.alt,
      width: this.width,
      height: this.height,
      src: this.src,
      originVariantIds: this.originVariantIds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
