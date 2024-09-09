import PostgreHelper from "infra/helpers/postgre-helper";
import { IInsertProductOptionRepository } from "./@interfaces/repositories.iterfaces";
import { IProductOptionEntity } from "domain/entities/@interfaces/product-option-entity.interface";

export default class InsertProductOptionRepository implements IInsertProductOptionRepository {
  async execute(productOptionEntity: IProductOptionEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO products
        (product_id, origin_id, origin_product_id, name, position, values)
      VALUES
        ($1, $2, $3, $4, $5, $6);
      `,
      productOptionEntity.getArray()
    );
  }
}
