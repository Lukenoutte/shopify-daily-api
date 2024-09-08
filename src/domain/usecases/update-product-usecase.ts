import { IAxiosHelper, IFileReaderHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { IUpdateProductUseCase } from "./@interfaces/usecases.interfaces";
import { IProductResponse } from "domain/entities/@interfaces/entities.interfaces";

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
    if (!data) throw new Error("Something went wrong! [UpdateProductUseCase]")
    const urls: string[] = JSON.parse(data);
    let successCount = 0;
    let failureCount = 0;

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const jsonUrl = `${url}.json`
          const response = await this.axiosHelper.get<IProductResponse | string>(jsonUrl);
          successCount++;
          return response;
        } catch (error) {
          failureCount++;
          return null;
        }
      })
    );
    const filtredResults = results.filter(result => result !== null && typeof result !== 'string');
    const failureResultsCount = successCount - filtredResults.length
    console.log('[#] Sucess:', filtredResults.length);
    console.log('[#] Errors:', failureCount + failureResultsCount);
  }
}

interface IFindUserConstructor {
    axiosHelper: IAxiosHelper,
    fileReaderHelper: IFileReaderHelper
  }