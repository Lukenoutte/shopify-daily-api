import PostgreHelper from "infra/helpers/postgre-helper";
import { IInsertProductImageRepository } from "./@interfaces/repositories.iterfaces";
import { IProductImageEntity } from "domain/entities/@interfaces/product-image-entity.interfaces";

export default class InsertProductImageRepository implements IInsertProductImageRepository {
  async execute(productImageEntity: IProductImageEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO product_images
        (product_id, origin_id, origin_product_id, position, origin_created_at, origin_updated_at, alt, width, height, src, origin_variant_ids)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
      `,
      productImageEntity.getArray()
    );
  }
}
