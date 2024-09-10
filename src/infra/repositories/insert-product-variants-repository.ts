import PostgreHelper from "infra/helpers/postgre-helper";
import { IInsertProductVariantRepository } from "./@interfaces/repositories.iterfaces";
import { IProductVariantEntity } from "domain/entities/@interfaces/product-variant-entity.interfaces";

export default class InsertProductVariantRepository
  implements IInsertProductVariantRepository
{
  async execute(productVariants: IProductVariantEntity) {
    try {
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
                $21, $22, $23, $24, $25, $26, $27, $28
              )
            ON CONFLICT (origin_id, origin_product_id)
            DO UPDATE SET
              product_id = EXCLUDED.product_id,
              origin_product_id = EXCLUDED.origin_product_id,
              title = EXCLUDED.title,
              price = EXCLUDED.price,
              sku = EXCLUDED.sku,
              position = EXCLUDED.position,
              compare_at_price = EXCLUDED.compare_at_price,
              fulfillment_service = EXCLUDED.fulfillment_service,
              inventory_management = EXCLUDED.inventory_management,
              option1 = EXCLUDED.option1,
              option2 = EXCLUDED.option2,
              option3 = EXCLUDED.option3,
              origin_created_at = EXCLUDED.origin_created_at,
              origin_updated_at = EXCLUDED.origin_updated_at,
              taxable = EXCLUDED.taxable,
              barcode = EXCLUDED.barcode,
              grams = EXCLUDED.grams,
              image_id = EXCLUDED.image_id,
              weight = EXCLUDED.weight,
              weight_unit = EXCLUDED.weight_unit,
              requires_shipping = EXCLUDED.requires_shipping,
              quantity_rule_min = EXCLUDED.quantity_rule_min,
              quantity_rule_max = EXCLUDED.quantity_rule_max,
              quantity_rule_increment = EXCLUDED.quantity_rule_increment,
              price_currency = EXCLUDED.price_currency,
              compare_at_price_currency = EXCLUDED.compare_at_price_currency,
              quantity_price_breaks = EXCLUDED.quantity_price_breaks,
              updated_at = NOW();

        `,
        productVariants.getArray(),
      );
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error InsertProductVariantRepository: ${error.message}`);
    }
  }
}
