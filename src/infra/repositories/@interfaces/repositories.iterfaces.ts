import {
  IProductSnakeCase,
  IProductEntity,
} from "domain/entities/@interfaces/product-entity.interface";
import {
  IProductImageSnakeCase,
  IProductImageEntity,
} from "domain/entities/@interfaces/product-image-entity.interfaces";
import { IProductOptionSnakeCase, IProductOptionEntity } from "domain/entities/@interfaces/product-option-entity.interface";
import { IProductVariantSnakeCase, IProductVariantEntity } from "domain/entities/@interfaces/product-variant-entity.interfaces";

export interface IInsertProductsRepository {
  execute: (productEntity: IProductEntity) => Promise<number | undefined>;
}

export interface IInsertProductImagesRepository {
  execute: (productImageEntity: IProductImageEntity) => Promise<void>;
}

export interface IInsertProductOptionsRepository {
  execute: (productImageEntity: IProductOptionEntity) => Promise<void>;
}

export interface IInsertProductVariantsRepository {
  execute: (productVariants: IProductVariantEntity) => Promise<void>;
}

export interface ISelectProductsRepository {
  execute: () => Promise<IProductSnakeCase[] | undefined>;
}

export interface ISelectProductImagesByProductIdRepository {
  execute: (productId: number) => Promise<IProductImageSnakeCase[] | undefined>;
}

export interface ISelectProductOptionsByProductIdRepository {
  execute: (productId: number) => Promise<IProductOptionSnakeCase[] | undefined>;
}

export interface ISelectProductVariantsByProductIdRepository {
  execute: (productId: number) => Promise<IProductVariantSnakeCase[] | undefined>;
}
