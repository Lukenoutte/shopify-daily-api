import PostgreHelper from "infra/helpers/postgre-helper";
import { IInsertProductRepository } from "./@interfaces/repositories.iterfaces";
import { IProductEntity } from "domain/entities/@interfaces/product-entity.interface";

export default class InsertProductRepository implements IInsertProductRepository {
  async execute(productEntity: IProductEntity): Promise<number> {
    const { rows } = await PostgreHelper.executeQuery(
      `
      INSERT INTO products
        (origin_id, title, body_html, vendor, product_type, origin_created_at, handle, origin_updated_at, published_at, template_suffix, published_scope, tags)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
      `,
      productEntity.getArray()
    );
    const firstItem = rows[0]
    return firstItem.id;
  }
}
