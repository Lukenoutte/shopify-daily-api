import PostgreHelper from "infra/helpers/postgre-helper";
import { ICountProductsRepository } from "../@interfaces/repositories.iterfaces";

export default class CountProductsRepository
  implements ICountProductsRepository
{
  async execute({
    fullTextSearch = "",
    priceMin = 0,
    priceMax = 9999999,
  }: {
    fullTextSearch?: string;
    priceMin?: number;
    priceMax?: number | null;
  }): Promise<number | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
          SELECT COUNT(DISTINCT p.id) as count
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
              AND CAST(pv.price AS numeric) >= $2
              AND (COALESCE($3, NULL) IS NULL OR CAST(pv.price AS numeric) <= $3::numeric);
        `,
        [fullTextSearch, priceMin, priceMax],
      );
      if (!rows)
        throw new Error("Failed to count products [CountProductsRepository]");
      const firstItem = rows[0];
      return parseInt(firstItem.count, 10);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error GetProductCountRepository: ${error.message}`);
      }
    }
  }
}
