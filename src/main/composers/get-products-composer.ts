import GetProductsUseCase from "domain/usecases/get-products-usercase";
import SelectProductImagesByProductIdRepository from "infra/repositories/product-images/select-product-images-by-product-id";
import SelectProductOptionsByProductIdRepository from "infra/repositories/product-options/select-product-options-by-product-id";
import SelectProductVariantsByProductIdRepository from "infra/repositories/product-variants/select-product-variants-by-product-id";
import SelectProductsRepository from "infra/repositories/products/select-products-repository";
import GetProductsRouter from "presentation/routers/get-products-router";

export default class GetProductsComposer {
  static compose() {
    const getProductsUseCase = new GetProductsUseCase({
      selectProductsRepository: new SelectProductsRepository(),
      selectProductImagesRepository:
        new SelectProductImagesByProductIdRepository(),
      selectProductOptionsRepository:
        new SelectProductOptionsByProductIdRepository(),
      selectProductVariantsRepository:
        new SelectProductVariantsByProductIdRepository(),
    });
    return new GetProductsRouter({ getProductsUseCase });
  }
}
