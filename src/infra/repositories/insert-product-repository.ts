import PostgreHelper from "infra/helpers/postgre-helper";
import { IInsertProductRepository } from "./@interfaces/repositories.iterfaces";
import { IProductEntity } from "domain/entities/@interfaces/product-entity.interface";

export default class InsertProductRepository
  implements IInsertProductRepository
{
  async execute(productEntity: IProductEntity): Promise<number | undefined> {
    try {
      const { rows } = await PostgreHelper.executeQuery(
        `
          INSERT INTO products (
              origin_id, title, body_html, vendor, product_type, 
              origin_created_at, handle, origin_updated_at, 
              published_at, template_suffix, published_scope, tags
          ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (origin_id, handle) 
          DO UPDATE SET
              title = EXCLUDED.title,
              body_html = EXCLUDED.body_html,
              vendor = EXCLUDED.vendor,
              product_type = EXCLUDED.product_type,
              origin_created_at = EXCLUDED.origin_created_at,
              handle = EXCLUDED.handle,
              origin_updated_at = EXCLUDED.origin_updated_at,
              published_at = EXCLUDED.published_at,
              template_suffix = EXCLUDED.template_suffix,
              published_scope = EXCLUDED.published_scope,
              tags = EXCLUDED.tags,
              updated_at = NOW()
          RETURNING id;
        `,
        productEntity.getArray(),
      );
      if (!rows) throw new Error("Failed to insert [InsertProductRepository]");
      const firstItem = rows[0];
      return firstItem.id;
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error InsertProductRepository: ${error.message}`);
    }
  }
}
