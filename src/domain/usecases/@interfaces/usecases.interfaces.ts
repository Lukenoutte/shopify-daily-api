export interface IUpdateProductUseCase {
  execute: () => Promise<void>;
}

export interface IGetProductsUseCase {
  execute: () => Promise<unknown[]>;
}
