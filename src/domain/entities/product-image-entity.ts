import { IProductImageData, IProductImageEntity } from './@interfaces/product-image-entity.interfaces';

export default class ProductImageEntity implements IProductImageEntity {
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

  constructor({
    ref_product_id,
    id,
    product_id,
    position,
    created_at,
    updated_at,
    alt,
    width,
    height,
    src,
    variant_ids,
  }: IProductImageData) {
    this.productId = ref_product_id;
    this.originId = id;
    this.originProductId = product_id;
    this.position = position;
    this.originCreatedAt = created_at;
    this.originUpdatedAt = updated_at;
    this.alt = alt;
    this.width = width;
    this.height = height;
    this.src = src;
    this.originVariantIds = variant_ids;
  }

  getArray(): any[] {
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
}
