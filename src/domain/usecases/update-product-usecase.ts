import { IAxiosHelper, IFileReaderHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { IUpdateProductUseCase } from "./@interfaces/usecases.interfaces";
import { IProductData } from "domain/entities/@interfaces/product-entity.interface";

export default class UpdateProductUseCase implements IUpdateProductUseCase {
    axiosHelper: IAxiosHelper;
    fileReaderHelper: IFileReaderHelper;

  constructor({
    axiosHelper,
    fileReaderHelper
  }: IFindUserConstructor) {
    this.axiosHelper = axiosHelper;
    this.fileReaderHelper = fileReaderHelper
  }

  async execute() {
    const data = await this.fileReaderHelper.readFile("urls.txt")
    if (!data) throw new Error("Failed to read [UpdateProductUseCase]")
    const urls: string[] = JSON.parse(data);
    const productData = await this.retrieveProductData(urls)
  }

  async retrieveProductData(urls: string[]) {
    let successCount = 0;

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const jsonUrl = `${url}.json`
          const response = await this.axiosHelper.get<IProductData | string>(jsonUrl);
          successCount++;
          return response;
        } catch (error) {
          return null;
        }
      })
    );
    const filtredResults = results.filter(result => result !== null && typeof result !== 'string');
    console.log('[#] Success:', filtredResults.length);
    return filtredResults
  }
}


interface IFindUserConstructor {
    axiosHelper: IAxiosHelper,
    fileReaderHelper: IFileReaderHelper
  }