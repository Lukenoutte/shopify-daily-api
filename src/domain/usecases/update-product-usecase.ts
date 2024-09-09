import ProductEntity from "domain/entities/product-entity";
import ProductVariantEntity from "domain/entities/product-variant-entity";
import ProductImageEntity from "domain/entities/product-image-entity";
import ProductOptionDataEntity from "domain/entities/product-option-entity";
import {
  IAxiosHelper,
  IFileReaderHelper,
} from "infra/helpers/@interfaces/helper.interfaces";
import { IUpdateProductUseCase } from "./@interfaces/usecases.interfaces";
import { IProductDataComplete } from "domain/entities/@interfaces/product-entity.interface";
import {
  IInsertProductImageRepository,
  IInsertProductOptionRepository,
  IInsertProductRepository,
  IInsertProductVariantRepository,
} from "infra/repositories/@interfaces/repositories.iterfaces";
import { IProductVariantData } from "domain/entities/@interfaces/product-variant-entity.interfaces";
import { IProductImageData } from "domain/entities/@interfaces/product-image-entity.interfaces";
import { IProductOptionData } from "domain/entities/@interfaces/product-option-entity.interface";

export default class UpdateProductUseCase implements IUpdateProductUseCase {
  axiosHelper: IAxiosHelper;
  fileReaderHelper: IFileReaderHelper;
  insertProductRepository: IInsertProductRepository;
  insertProductImageRespository: IInsertProductImageRepository;
  insertProductOptionRepository: IInsertProductOptionRepository;
  insertProductVariantRepository: IInsertProductVariantRepository;

  constructor({
    axiosHelper,
    fileReaderHelper,
    insertProductRepository,
    insertProductImageRespository,
    insertProductOptionRepository,
    insertProductVariantRepository,
  }: IFindUserConstructor) {
    this.axiosHelper = axiosHelper;
    this.fileReaderHelper = fileReaderHelper;
    this.insertProductRepository = insertProductRepository;
    this.insertProductImageRespository = insertProductImageRespository;
    this.insertProductOptionRepository = insertProductOptionRepository;
    this.insertProductVariantRepository = insertProductVariantRepository;
  }

  async execute() {
    const data = await this.fileReaderHelper.readFile("urls.txt");
    if (!data) throw new Error("Failed to read [UpdateProductUseCase]");
    const urls: string[] = JSON.parse(data);
    const productData = await this.retrieveProductData(urls);
    const test = [productData[1]];
    for (const data of test) {
      await this.insertProductIntoDatabase(data);
    }
  }

  async retrieveProductData(urls: string[]) {
    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const jsonUrl = `${url}.json`;
          const response = await this.axiosHelper.get<
            IProductDataComplete | string
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

  async insertProductIntoDatabase(productData: IProductDataComplete) {
    const { product } = productData;
    const productEntity = new ProductEntity(product);
    const productId = await this.insertProductRepository.execute(productEntity);
    if (!productId)
      throw new Error("Failed to Insert Product [UpdateProductUseCase]");
    await Promise.all([
      this.insertVariants(productId, product.variants),
      this.insertImages(productId, product.images),
      this.insertOptions(productId, product.options),
    ]);
  }

  async insertVariants(productId: number, variants: IProductVariantData[]) {
    for (const variant of variants) {
      const productVariantEntity = new ProductVariantEntity({
        ref_product_id: productId,
        ...variant,
      });
      await this.insertProductVariantRepository.execute(productVariantEntity);
    }
  }

  async insertImages(productId: number, images: IProductImageData[]) {
    for (const image of images) {
      const productImageEntity = new ProductImageEntity({
        ref_product_id: productId,
        ...image,
      });
      await this.insertProductImageRespository.execute(productImageEntity);
    }
  }

  async insertOptions(productId: number, options: IProductOptionData[]) {
    for (const option of options) {
      const productOptionEntity = new ProductOptionDataEntity({
        ref_product_id: productId,
        ...option,
      });
      await this.insertProductOptionRepository.execute(productOptionEntity);
    }
  }
}

interface IFindUserConstructor {
  axiosHelper: IAxiosHelper;
  fileReaderHelper: IFileReaderHelper;
  insertProductRepository: IInsertProductRepository;
  insertProductImageRespository: IInsertProductImageRepository;
  insertProductOptionRepository: IInsertProductOptionRepository;
  insertProductVariantRepository: IInsertProductVariantRepository;
}
