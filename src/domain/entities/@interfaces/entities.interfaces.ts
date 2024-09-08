export interface IProductResponse {
    product: {
      id: number;
      title: string;
      body_html: string;
      vendor: string;
      product_type: string;
      created_at: string;
      handle: string;
      updated_at: string;
      published_at: string;
      template_suffix: string;
      published_scope: string;
      tags: string;
      variants: Variant[];
      options: Option[];
      images: Image[];
    };
  }
  
  interface Variant {
    id: number;
    product_id: number;
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
    created_at: string;
    updated_at: string;
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
    quantity_price_breaks: any[];
  }
  
  interface QuantityRule {
    min: number;
    max: number | null;
    increment: number;
  }
  
  interface Option {
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: string[];
  }
  
  interface Image {
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: string | null;
    width: number;
    height: number;
    src: string;
    variant_ids: number[];
  }
  