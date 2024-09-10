import ProductEntity from "domain/entities/product-entity";
import ProductVariantEntity from "domain/entities/product-variant-entity";
import ProductImageEntity from "domain/entities/product-image-entity";
import ProductOptionDataEntity from "domain/entities/product-option-entity";
import {
  IAxiosHelper,
  IFileReaderHelper,
} from "infra/helpers/@interfaces/helper.interfaces";
import { IUpdateProductUseCase } from "./@interfaces/usecases.interfaces";
import { IProductSnakeCase } from "domain/entities/@interfaces/product-entity.interface";
import {
  IInsertProductImagesRepository,
  IInsertProductOptionsRepository,
  IInsertProductsRepository,
  IInsertProductVariantsRepository,
} from "infra/repositories/@interfaces/repositories.iterfaces";
import { IProductVariantSnakeCase } from "domain/entities/@interfaces/product-variant-entity.interfaces";
import { IProductImageSnakeCase } from "domain/entities/@interfaces/product-image-entity.interfaces";
import { IProductOptionSnakeCase } from "domain/entities/@interfaces/product-option-entity.interface";

export default class UpdateProductUseCase implements IUpdateProductUseCase {
  axiosHelper: IAxiosHelper;
  fileReaderHelper: IFileReaderHelper;
  insertProductsRepository: IInsertProductsRepository;
  insertProductImagesRespository: IInsertProductImagesRepository;
  insertProductOptionsRepository: IInsertProductOptionsRepository;
  insertProductVariantsRepository: IInsertProductVariantsRepository;

  constructor({
    axiosHelper,
    fileReaderHelper,
    insertProductsRepository,
    insertProductImagesRespository,
    insertProductOptionsRepository,
    insertProductVariantsRepository,
  }: IFindUserConstructor) {
    this.axiosHelper = axiosHelper;
    this.fileReaderHelper = fileReaderHelper;
    this.insertProductsRepository = insertProductsRepository;
    this.insertProductImagesRespository = insertProductImagesRespository;
    this.insertProductOptionsRepository = insertProductOptionsRepository;
    this.insertProductVariantsRepository = insertProductVariantsRepository;
  }

  async execute() {
    const data = await this.fileReaderHelper.readFile("urls.txt");
    if (!data) throw new Error("Failed to read [UpdateProductUseCase]");
    const urls: string[] = JSON.parse(data);
    const productData = await this.retrieveProductData(urls);
    for (const data of productData) {
      await this.insertProductsIntoDatabase(data);
    }
    console.log("[#] Inserted!");
  }

  async retrieveProductData(urls: string[]) {
    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const jsonUrl = `${url}.json`;
          const response = await this.axiosHelper.get<
            { product: IProductSnakeCase } | string
          >(jsonUrl);
          return response;
        } catch {
          return null;
        }
      }),
    );
    const filtredResults = results.filter(
      (result) => result !== null && typeof result !== "string",
    );
    console.log("[#] Success:", filtredResults.length);
    return filtredResults;
  }

  async insertProductsIntoDatabase(productData: {
    product: IProductSnakeCase;
  }) {
    const { product } = productData;
    const productEntity = new ProductEntity({
      ...product,
      origin_id: product.id,
      origin_created_at: product.created_at,
      origin_updated_at: product.updated_at,
    });
    const productId =
      await this.insertProductsRepository.execute(productEntity);
    if (!productId)
      throw new Error("Failed to Insert Product [UpdateProductUseCase]");
    await Promise.all([
      this.insertVariants(productId, product.variants),
      this.insertImages(productId, product.images),
      this.insertOptions(productId, product.options),
    ]);
  }

  async insertVariants(
    productId: number,
    variants: IProductVariantSnakeCase[],
  ) {
    for (const variant of variants) {
      const productVariantEntity = new ProductVariantEntity({
        ...variant,
        product_id: productId,
        origin_id: variant.id,
        origin_product_id: variant.product_id,
        origin_created_at: variant.created_at,
        origin_updated_at: variant.updated_at,
      });
      await this.insertProductVariantsRepository.execute(productVariantEntity);
    }
  }

  async insertImages(productId: number, images: IProductImageSnakeCase[]) {
    for (const image of images) {
      const productImageEntity = new ProductImageEntity({
        ...image,
        product_id: productId,
        origin_id: image.id,
        origin_product_id: image.product_id,
        origin_created_at: image.created_at,
        origin_updated_at: image.updated_at,
        origin_variant_ids: image.variant_ids,
      });
      await this.insertProductImagesRespository.execute(productImageEntity);
    }
  }

  async insertOptions(productId: number, options: IProductOptionSnakeCase[]) {
    for (const option of options) {
      const productOptionEntity = new ProductOptionDataEntity({
        ...option,
        product_id: productId,
        origin_id: option.id,
        origin_product_id: option.product_id,
      });
      await this.insertProductOptionsRepository.execute(productOptionEntity);
    }
  }
}

interface IFindUserConstructor {
  axiosHelper: IAxiosHelper;
  fileReaderHelper: IFileReaderHelper;
  insertProductsRepository: IInsertProductsRepository;
  insertProductImagesRespository: IInsertProductImagesRepository;
  insertProductOptionsRepository: IInsertProductOptionsRepository;
  insertProductVariantsRepository: IInsertProductVariantsRepository;
}
