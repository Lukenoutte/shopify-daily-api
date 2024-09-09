import UpdateProductUseCase from "domain/usecases/update-product-usecase";
import AxiosHelper from "infra/helpers/axios-helper";
import FileReaderHelper from "infra/helpers/file-reader-helper";
import InsertProductImageRepository from "infra/repositories/insert-product-image-repository";
import InsertProductOptionRepository from "infra/repositories/insert-product-option-repository";
import InsertProductRepository from "infra/repositories/insert-product-repository";
import InsertProductVariantRepository from "infra/repositories/insert-product-variants-repository";

export default class UpdateProductComposer {
  compose() {
    const axiosHelper = new AxiosHelper();
    const insertProductRepository = new InsertProductRepository();
    const insertProductImageRespository = new InsertProductImageRepository();
    const insertProductOptionRepository = new InsertProductOptionRepository();
    const insertProductVariantRepository = new InsertProductVariantRepository();
    const fileReaderHelper = new FileReaderHelper();
    const updateProductUseCase = new UpdateProductUseCase({
      axiosHelper,
      fileReaderHelper,
      insertProductRepository,
      insertProductImageRespository,
      insertProductOptionRepository,
      insertProductVariantRepository,
    });
    updateProductUseCase.execute();
  }
}
