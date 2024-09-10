import PostgreHelper from "infra/helpers/postgre-helper";
import { ISelectProductsRepository } from "../@interfaces/repositories.iterfaces";
import { IProductSnakeCase } from "domain/entities/@interfaces/product-entity.interface";

export default class SelectProductsRepository
  implements ISelectProductsRepository
{
  async execute(): Promise<IProductSnakeCase[] | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
            SELECT * FROM products;
        `,
        [],
      );
      return rows;
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error SelectProductsRepository: ${error.message}`);
    }
  }
}
