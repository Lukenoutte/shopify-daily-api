import {
  IProductVariantSnakeCase,
  QuantityRule,
  IProductVariantEntity,
} from "./@interfaces/product-variant-entity.interfaces";

export default class ProductVariantEntity implements IProductVariantEntity {
  id: number;
  productId: number;
  originId: number;
  originProductId?: number;
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
  quantityRule: QuantityRule;
  priceCurrency: string;
  compareAtPriceCurrency: string;
  quantityPriceBreaks: unknown[];
  createdAt: string;
  updatedAt: string;

  constructor({
    product_id,
    id,
    origin_id,
    origin_product_id,
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
    origin_created_at,
    origin_updated_at,
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
    created_at,
    updated_at,
  }: IProductVariantSnakeCase) {
    this.id = id;
    this.productId = product_id;
    this.originId = origin_id;
    this.originProductId = origin_product_id;
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
    this.originCreatedAt = origin_created_at;
    this.originUpdatedAt = origin_updated_at;
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
    this.createdAt = created_at;
    this.updatedAt = updated_at;
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

  getObject() {
    return {
      id: this.id,
      productId: this.productId,
      originId: this.originId,
      originProductId: this.originProductId,
      title: this.title,
      price: this.price,
      sku: this.sku,
      position: this.position,
      compareAtPrice: this.compareAtPrice,
      fulfillmentService: this.fulfillmentService,
      inventoryManagement: this.inventoryManagement,
      option1: this.option1,
      option2: this.option2,
      option3: this.option3,
      originCreatedAt: this.originCreatedAt,
      originUpdatedAt: this.originUpdatedAt,
      taxable: this.taxable,
      barcode: this.barcode,
      grams: this.grams,
      imageId: this.imageId,
      weight: this.weight,
      weightUnit: this.weightUnit,
      requiresShipping: this.requiresShipping,
      quantityRule: this.quantityRule,
      priceCurrency: this.priceCurrency,
      compareAtPriceCurrency: this.compareAtPriceCurrency,
      quantityPriceBreaks: this.quantityPriceBreaks,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
