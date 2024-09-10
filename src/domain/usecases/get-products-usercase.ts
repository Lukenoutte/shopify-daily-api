import ProductEntity from "domain/entities/product-entity";
import ProductImageEntity from "domain/entities/product-image-entity";
import ProductVariantEntity from "domain/entities/product-variant-entity";
import ProductOptionEntity from "domain/entities/product-option-entity";
import { IGetProductsUseCase } from "./@interfaces/usecases.interfaces";
import {
  ISelectProductImagesByProductIdRepository,
  ISelectProductOptionsByProductIdRepository,
  ISelectProductsRepository,
  ISelectProductVariantsByProductIdRepository,
} from "infra/repositories/@interfaces/repositories.iterfaces";
import { IProductResponse } from "domain/entities/@interfaces/product-entity.interface";

export default class GetProductsUseCase implements IGetProductsUseCase {
  selectProductsRepository: ISelectProductsRepository;
  selectProductImagesRepository: ISelectProductImagesByProductIdRepository;
  selectProductOptionsRepository: ISelectProductOptionsByProductIdRepository;
  selectProductVariantsRepository: ISelectProductVariantsByProductIdRepository;

  constructor({
    selectProductsRepository,
    selectProductImagesRepository,
    selectProductOptionsRepository,
    selectProductVariantsRepository,
  }: IGetProductsConstructor) {
    this.selectProductsRepository = selectProductsRepository;
    this.selectProductImagesRepository = selectProductImagesRepository;
    this.selectProductOptionsRepository = selectProductOptionsRepository;
    this.selectProductVariantsRepository = selectProductVariantsRepository;
  }

  async execute(): Promise<IProductResponse[]> {
    const products = await this.selectProductsRepository.execute();
    if (!products) return [];

    const productResponse = await Promise.all(
      products.map(async (productData) => {
        let images = await this.selectProductImagesRepository.execute(
          productData.id,
        );
        let variants = await this.selectProductVariantsRepository.execute(
          productData.id,
        );
        let options = await this.selectProductOptionsRepository.execute(
          productData.id,
        );
        if (!images) images = [];
        if (!variants) variants = [];
        if (!options) options = [];
        const productEntity = new ProductEntity(productData);
        const imagesCalmelCase = images.map((imageData) =>
          new ProductImageEntity(imageData).getObject(),
        );
        const variantCalmelCase = variants.map((variantData) =>
          new ProductVariantEntity(variantData).getObject(),
        );
        const optionCalmelCase = options.map((optionData) =>
          new ProductOptionEntity(optionData).getObject(),
        );

        productEntity.images = imagesCalmelCase;
        productEntity.variants = variantCalmelCase;
        productEntity.options = optionCalmelCase;
        return productEntity.getObject();
      }),
    );

    return productResponse;
  }
}

interface IGetProductsConstructor {
  selectProductsRepository: ISelectProductsRepository;
  selectProductImagesRepository: ISelectProductImagesByProductIdRepository;
  selectProductOptionsRepository: ISelectProductOptionsByProductIdRepository;
  selectProductVariantsRepository: ISelectProductVariantsByProductIdRepository;
}
