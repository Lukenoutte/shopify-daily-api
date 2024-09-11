import ProductEntity from "domain/entities/product-entity";
import ProductImageEntity from "domain/entities/product-image-entity";
import ProductVariantEntity from "domain/entities/product-variant-entity";
import ProductOptionEntity from "domain/entities/product-option-entity";
import { IGetProductsUseCase } from "./@interfaces/usecases.interfaces";
import {
  ICountProductsRepository,
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
  countProductsRepository: ICountProductsRepository;

  constructor({
    selectProductsRepository,
    selectProductImagesRepository,
    selectProductOptionsRepository,
    selectProductVariantsRepository,
    countProductsRepository,
  }: IGetProductsConstructor) {
    this.selectProductsRepository = selectProductsRepository;
    this.selectProductImagesRepository = selectProductImagesRepository;
    this.selectProductOptionsRepository = selectProductOptionsRepository;
    this.selectProductVariantsRepository = selectProductVariantsRepository;
    this.countProductsRepository = countProductsRepository;
  }

  async execute({
    fullTextSearch,
    limit = 7,
    offset = 0,
    priceMin,
    priceMax,
  }: {
    fullTextSearch?: string;
    limit?: number;
    offset?: number;
    priceMin?: number;
    priceMax?: number;
  }): Promise<{
    data: IProductResponse[];
    limit: number;
    offset: number;
    count?: number;
  }> {
    const products = await this.selectProductsRepository.execute({
      fullTextSearch,
      limit,
      offset,
      priceMin,
      priceMax,
    });
    if (!products) return { data: [], limit, offset };

    const productResponse = await Promise.all(
      products.map(async (productData) => {
        const { images, variants, options } = await this.getAdicionalData(
          productData.id,
        );
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

    const count = await this.countProductsRepository.execute({
      fullTextSearch,
      priceMin,
      priceMax,
    });

    return { data: productResponse, limit, offset, count: count ?? 0 };
  }

  async getAdicionalData(productId: number) {
    const images =
      (await this.selectProductImagesRepository.execute(productId)) ?? [];
    const variants =
      (await this.selectProductVariantsRepository.execute(productId)) ?? [];
    const options =
      (await this.selectProductOptionsRepository.execute(productId)) ?? [];
    return { images, variants, options };
  }
}

interface IGetProductsConstructor {
  selectProductsRepository: ISelectProductsRepository;
  selectProductImagesRepository: ISelectProductImagesByProductIdRepository;
  selectProductOptionsRepository: ISelectProductOptionsByProductIdRepository;
  selectProductVariantsRepository: ISelectProductVariantsByProductIdRepository;
  countProductsRepository: ICountProductsRepository;
}
