import PostgreHelper from "infra/helpers/postgre-helper";
import { IInsertProductVariantRepository } from "./@interfaces/repositories.iterfaces";
import { IProductVariantEntity } from "domain/entities/@interfaces/product-variant-entity.interfaces";

export default class InsertProductVariantRepository implements IInsertProductVariantRepository {
  async execute(productVariants: IProductVariantEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO product_variants
        (
          product_id, origin_id, origin_product_id, title, price, sku, position, compare_at_price,
          fulfillment_service, inventory_management, option1, option2, option3, origin_created_at,
          origin_updated_at, taxable, barcode, grams, image_id, weight, weight_unit, requires_shipping,
          quantity_rule_min, quantity_rule_max, quantity_rule_increment, price_currency,
          compare_at_price_currency, quantity_price_breaks
        )
      VALUES
        (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24, $25, $26, $27
        );
      `,
      productVariants.getArray()
    );
  }
}
