import PostgreHelper from "infra/helpers/postgre-helper";
import { ICountProductsRepository } from "../@interfaces/repositories.iterfaces";

export default class CountProductsRepository
  implements ICountProductsRepository
{
  async execute(): Promise<number | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
            SELECT COUNT(*) as count FROM products;
        `,
        [],
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
