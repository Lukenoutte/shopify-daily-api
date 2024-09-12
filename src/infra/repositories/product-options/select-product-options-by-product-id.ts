import PostgreHelper from "infra/helpers/postgre-helper";
import { ISelectProductOptionsByProductIdRepository } from "../@interfaces/repositories.iterfaces";
import { IProductOptionSnakeCase } from "domain/entities/@interfaces/product-option-entity.interface";

export default class SelectProductOptionsByProductIdRepository
  implements ISelectProductOptionsByProductIdRepository
{
  async execute(
    productId: number,
  ): Promise<IProductOptionSnakeCase[] | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
            SELECT * FROM product_options WHERE product_id = $1;
        `,
        [productId],
      );
      return rows;
    } catch (error) {
      if (error instanceof Error)
        console.error(
          `Error SelectProductOptionsByProductIdRepository: ${error.message}`,
        );
    }
  }
}
