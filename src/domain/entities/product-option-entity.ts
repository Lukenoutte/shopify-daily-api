import {
  IProductOptionSnakeCase,
  IProductOptionEntity,
} from "./@interfaces/product-option-entity.interface";

export default class ProductOptionEntity implements IProductOptionEntity {
  id: number;
  productId: number;
  originId: number;
  originProductId?: number;
  name: string;
  position: number;
  values: string[];
  createdAt: string;
  updatedAt: string;

  constructor({
    product_id,
    id,
    origin_id,
    origin_product_id,
    name,
    position,
    values,
    created_at,
    updated_at,
  }: IProductOptionSnakeCase) {
    this.id = id;
    this.productId = product_id;
    this.originId = origin_id;
    this.originProductId = origin_product_id;
    this.name = name;
    this.position = position;
    this.values = values;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  getArray(): unknown[] {
    return [
      this.productId,
      this.originId,
      this.originProductId,
      this.name,
      this.position,
      this.values,
    ];
  }

  getObject() {
    return {
      id: this.id,
      productId: this.productId,
      originId: this.originId,
      originProductId: this.originProductId,
      name: this.name,
      position: this.position,
      values: this.values,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
