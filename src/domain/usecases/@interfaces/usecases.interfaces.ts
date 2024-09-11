import { IProductResponse } from "domain/entities/@interfaces/product-entity.interface";

export interface IUpdateProductUseCase {
  execute: () => Promise<void>;
}

export interface IGetProductsUseCase {
  execute: ({
    fullTextSearch,
    limit,
    offset,
  }: {
    fullTextSearch?: string;
    limit?: number;
    offset?: number;
  }) => Promise<IProductResponse[]>;
}
