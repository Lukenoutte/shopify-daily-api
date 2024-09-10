import PostgreHelper from "infra/helpers/postgre-helper";
import { IProductImageEntity } from "domain/entities/@interfaces/product-image-entity.interfaces";
import { IInsertProductImagesRepository } from "../@interfaces/repositories.iterfaces";

export default class InsertProductImagesRepository
  implements IInsertProductImagesRepository
{
  async execute(productImageEntity: IProductImageEntity) {
    try {
      await PostgreHelper.executeQuery(
        `
          INSERT INTO product_images
            (product_id, origin_id, origin_product_id, position, origin_created_at, origin_updated_at, alt, width, height, src, origin_variant_ids)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (product_id, origin_id)
          DO UPDATE SET
            position = EXCLUDED.position,
            origin_created_at = EXCLUDED.origin_created_at,
            origin_updated_at = EXCLUDED.origin_updated_at,
            alt = EXCLUDED.alt,
            width = EXCLUDED.width,
            height = EXCLUDED.height,
            src = EXCLUDED.src,
            origin_variant_ids = EXCLUDED.origin_variant_ids,
            updated_at = NOW();
        `,
        productImageEntity.getArray(),
      );
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error InsertProductImageRepository: ${error.message}`);
    }
  }
}
