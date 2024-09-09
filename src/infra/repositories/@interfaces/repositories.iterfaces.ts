import { IProductEntity } from "domain/entities/@interfaces/product-entity.interface";
import { IProductImageEntity } from "domain/entities/@interfaces/product-image-entity.interfaces";
import { IProductOptionEntity } from "domain/entities/@interfaces/product-option-entity.interface";
import { IProductVariantEntity } from "domain/entities/@interfaces/product-variant-entity.interfaces";

export interface IInsertProductRepository {
  execute: (productEntity: IProductEntity) => Promise<number | undefined>;
}

export interface IInsertProductImageRepository {
  execute: (productImageEntity: IProductImageEntity) => Promise<void>;
}

export interface IInsertProductOptionRepository {
  execute: (productImageEntity: IProductOptionEntity) => Promise<void>;
}

export interface IInsertProductVariantRepository {
  execute: (productVariants: IProductVariantEntity) => Promise<void>;
}
