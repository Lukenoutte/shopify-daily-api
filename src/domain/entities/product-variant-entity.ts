import {
  IProductVariantData,
  QuantityRule,
  IProductVariantEntity,
} from "./@interfaces/product-variant-entity.interfaces";

export default class ProductVariantEntity implements IProductVariantEntity {
  productId?: number;
  originId: number;
  originProductId: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  compareAtPrice: string;
  fulfillmentService: string;
  inventoryManagement: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  originCreatedAt: string;
  originUpdatedAt: string;
  taxable: boolean;
  barcode: string;
  grams: number;
  imageId: number;
  weight: number;
  weightUnit: string;
  requiresShipping: boolean;
  quantityRule?: QuantityRule;
  priceCurrency: string;
  compareAtPriceCurrency: string;
  quantityPriceBreaks?: unknown[];

  constructor({
    ref_product_id,
    id,
    product_id,
    title,
    price,
    sku,
    position,
    compare_at_price,
    fulfillment_service,
    inventory_management,
    option1,
    option2,
    option3,
    created_at,
    updated_at,
    taxable,
    barcode,
    grams,
    image_id,
    weight,
    weight_unit,
    requires_shipping,
    quantity_rule,
    price_currency,
    compare_at_price_currency,
    quantity_price_breaks,
  }: IProductVariantData) {
    this.productId = ref_product_id;
    this.originId = id;
    this.originProductId = product_id;
    this.title = title;
    this.price = price;
    this.sku = sku;
    this.position = position;
    this.compareAtPrice = compare_at_price;
    this.fulfillmentService = fulfillment_service;
    this.inventoryManagement = inventory_management;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.originCreatedAt = created_at;
    this.originUpdatedAt = updated_at;
    this.taxable = taxable;
    this.barcode = barcode;
    this.grams = grams;
    this.imageId = image_id;
    this.weight = weight;
    this.weightUnit = weight_unit;
    this.requiresShipping = requires_shipping;
    this.quantityRule = quantity_rule;
    this.priceCurrency = price_currency;
    this.compareAtPriceCurrency = compare_at_price_currency;
    this.quantityPriceBreaks = quantity_price_breaks;
  }

  getArray(): unknown[] {
    return [
      this.productId,
      this.originId,
      this.originProductId,
      this.title,
      this.price,
      this.sku,
      this.position,
      this.compareAtPrice,
      this.fulfillmentService,
      this.inventoryManagement,
      this.option1,
      this.option2,
      this.option3,
      this.originCreatedAt,
      this.originUpdatedAt,
      this.taxable,
      this.barcode,
      this.grams,
      this.imageId,
      this.weight,
      this.weightUnit,
      this.requiresShipping,
      this.quantityRule?.min || null,
      this.quantityRule?.max || null,
      this.quantityRule?.increment || null,
      this.priceCurrency,
      this.compareAtPriceCurrency,
      this.quantityPriceBreaks || null,
    ];
  }
}
