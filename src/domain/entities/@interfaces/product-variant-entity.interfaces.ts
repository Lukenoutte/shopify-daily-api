export interface IProductVariantSnakeCase {
  product_id: number;
  id: number;
  origin_id: number;
  origin_product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  origin_created_at: string;
  origin_updated_at: string;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id: number;
  weight: number;
  weight_unit: string;
  requires_shipping: boolean;
  quantity_rule: QuantityRule;
  price_currency: string;
  compare_at_price_currency: string;
  quantity_price_breaks: unknown[];
  created_at: string;
  updated_at: string;
}

export interface QuantityRule {
  min: number;
  max: number | null;
  increment: number;
}

export interface IProductVariant {
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
}

export interface IProductVariantEntity extends IProductVariant {
  getArray: () => unknown[];
}
