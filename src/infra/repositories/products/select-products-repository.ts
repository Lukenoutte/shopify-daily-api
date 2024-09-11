import PostgreHelper from "infra/helpers/postgre-helper";
import { ISelectProductsRepository } from "../@interfaces/repositories.iterfaces";
import { IProductSnakeCase } from "domain/entities/@interfaces/product-entity.interface";

export default class SelectProductsRepository
  implements ISelectProductsRepository
{
  async execute({
    fullTextSearch = "",
    limit,
    offset,
    priceMin = 0,
    priceMax = null,
  }: {
    fullTextSearch?: string;
    limit: number;
    offset: number;
    priceMin?: number;
    priceMax?: number | null;
  }): Promise<IProductSnakeCase[] | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
        SELECT p.*, MIN(pv.price) AS min_price, MAX(pv.price) AS max_price
        FROM products p
        JOIN product_variants pv ON p.id = pv.product_id
        WHERE
          (
            $1 = '' OR (
              to_tsvector(p.title) @@ plainto_tsquery($1) OR
              to_tsvector(p.vendor) @@ plainto_tsquery($1) OR
              to_tsvector(p.tags) @@ plainto_tsquery($1) OR
              to_tsvector(p.product_type) @@ plainto_tsquery($1)
            )
          )
          AND pv.price >= $4
          AND (pv.price <= $5 OR $5 IS NULL)
        GROUP BY p.id
        ORDER BY p.published_at DESC
        LIMIT $2 OFFSET $3;
        `,
        [fullTextSearch, limit, offset, priceMin, priceMax],
      );
      return rows;
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error SelectProductsRepository: ${error.message}`);
    }
  }
}
