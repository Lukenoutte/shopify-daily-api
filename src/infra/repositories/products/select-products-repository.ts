import PostgreHelper from "infra/helpers/postgre-helper";
import { ISelectProductsRepository } from "../@interfaces/repositories.iterfaces";
import { IProductSnakeCase } from "domain/entities/@interfaces/product-entity.interface";

export default class SelectProductsRepository
  implements ISelectProductsRepository
{
  async execute({
    fullTextSearch = "",
    limit,
    offset = 0,
  }: {
    fullTextSearch?: string;
    limit?: number;
    offset?: number;
  }): Promise<IProductSnakeCase[] | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
           SELECT * FROM products
            WHERE
            (
              $1 = '' OR (
                to_tsvector(title) @@ plainto_tsquery($1) OR
                to_tsvector(vendor) @@ plainto_tsquery($1) OR
                to_tsvector(tags) @@ plainto_tsquery($1) OR
                to_tsvector(product_type) @@ plainto_tsquery($1)
              )
            )
            ORDER BY published_at DESC
            LIMIT $2 OFFSET $3;

        `,
        [fullTextSearch, limit, offset],
      );
      return rows;
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error SelectProductsRepository: ${error.message}`);
    }
  }
}
