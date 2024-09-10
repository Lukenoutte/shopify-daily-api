import UpdateProductsUseCase from "domain/usecases/update-products-usecase";
import AxiosHelper from "infra/helpers/axios-helper";
import FileReaderHelper from "infra/helpers/file-reader-helper";
import InsertProductImagesRepository from "infra/repositories/product-images/insert-product-images-repository";
import InsertProductOptionsRepository from "infra/repositories/product-options/insert-product-options-repository";
import InsertProductVariantsRepository from "infra/repositories/product-variants/insert-product-variants-repository";
import InsertProductsRepository from "infra/repositories/products/insert-products-repository";

export default class UpdateProductComposer {
  static compose() {
    const updateProductsUseCase = new UpdateProductsUseCase({
      axiosHelper: new AxiosHelper(),
      fileReaderHelper: new FileReaderHelper(),
      insertProductsRepository: new InsertProductsRepository(),
      insertProductImagesRespository: new InsertProductImagesRepository(),
      insertProductOptionsRepository: new InsertProductOptionsRepository(),
      insertProductVariantsRepository: new InsertProductVariantsRepository(),
    });
    updateProductsUseCase.execute();
  }
}
