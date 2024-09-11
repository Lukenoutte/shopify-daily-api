import { IProductResponse } from "domain/entities/@interfaces/product-entity.interface";

export interface IUpdateProductUseCase {
  execute: () => Promise<void>;
}

export interface IGetProductsUseCase {
  execute: ({
    fullTextSearch,
    limit,
    offset,
    priceMin,
    priceMax,
  }: {
    fullTextSearch?: string;
    limit?: number;
    offset?: number;
    priceMin?: number;
    priceMax?: number;
  }) => Promise<{ data: IProductResponse[]; limit: number; offset: number }>;
}
