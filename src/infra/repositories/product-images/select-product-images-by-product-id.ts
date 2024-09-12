import PostgreHelper from "infra/helpers/postgre-helper";
import { ISelectProductImagesByProductIdRepository } from "../@interfaces/repositories.iterfaces";
import { IProductImageSnakeCase } from "domain/entities/@interfaces/product-image-entity.interfaces";

export default class SelectProductImagesByProductIdRepository
  implements ISelectProductImagesByProductIdRepository
{
  async execute(
    productId: number,
  ): Promise<IProductImageSnakeCase[] | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
            SELECT * FROM product_images WHERE product_id = $1;
        `,
        [productId],
      );
      return rows;
    } catch (error) {
      if (error instanceof Error)
        console.error(
          `Error SelectProductImagesByProductIdRepository: ${error.message}`,
        );
    }
  }
}
