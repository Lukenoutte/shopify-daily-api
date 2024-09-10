import PostgreHelper from "infra/helpers/postgre-helper";
import { IProductOptionEntity } from "domain/entities/@interfaces/product-option-entity.interface";
import { IInsertProductOptionsRepository } from "../@interfaces/repositories.iterfaces";

export default class InsertProductOptionsRepository
  implements IInsertProductOptionsRepository
{
  async execute(productOptionEntity: IProductOptionEntity) {
    try {
      await PostgreHelper.executeQuery(
        `
          INSERT INTO product_options
            (product_id, origin_id, origin_product_id, name, position, values)
          VALUES
            ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (product_id, origin_id)
          DO UPDATE SET
            name = EXCLUDED.name,
            position = EXCLUDED.position,
            values = EXCLUDED.values,
            updated_at = NOW();
        `,
        productOptionEntity.getArray(),
      );
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error InsertProductOptionRepository: ${error.message}`);
    }
  }
}
