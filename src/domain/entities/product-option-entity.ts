import { IProductOptionData, IProductOptionEntity } from './@interfaces/product-option-entity.interface';

export default class ProductOptionDataEntity implements IProductOptionEntity {
  originId: number;
  originProductId: number;
  name: string;
  position: number;
  values: string[];

  constructor({
    id,
    product_id,
    name,
    position,
    values,
  }: IProductOptionData) {
    this.originId = id;
    this.originProductId = product_id;
    this.name = name;
    this.position = position;
    this.values = values;
  }

  getArray(): any[] {
    return [
      this.originId,
      this.originProductId,
      this.name,
      this.position,
      this.values,
    ];
  }
}
