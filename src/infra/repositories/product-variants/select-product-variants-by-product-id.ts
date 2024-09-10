import PostgreHelper from "infra/helpers/postgre-helper";
import { IProductVariantSnakeCase } from "domain/entities/@interfaces/product-variant-entity.interfaces";
import { ISelectProductVariantsByProductIdRepository } from "../@interfaces/repositories.iterfaces";

export default class SelectProductVariantsByProductIdRepository
  implements ISelectProductVariantsByProductIdRepository
{
  async execute(
    productId: number,
  ): Promise<IProductVariantSnakeCase[] | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
            SELECT * FROM product_variants WHERE product_id = $1;
        `,
        [productId],
      );
      return rows;
    } catch (error) {
      if (error instanceof Error)
        console.error(
          `Error SelectProductVariantsByProductIdRepository: ${error.message}`,
        );
    }
  }
}
