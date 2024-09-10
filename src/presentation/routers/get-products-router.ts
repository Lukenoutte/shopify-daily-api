// import { string, object } from "yup";
import HttpResponse from "../helpers/http-response";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";
import { Request } from "express";
import { IGetProductsUseCase } from "domain/usecases/@interfaces/usecases.interfaces";

export default class GetProductsRouter {
  #getProductsUseCase;

  constructor({
    getProductsUseCase,
  }: {
    getProductsUseCase: IGetProductsUseCase;
  }) {
    this.#getProductsUseCase = getProductsUseCase;
  }

  //   async validate(params: {
  //     masterId: string;
  //   }): Promise<{ isValid: boolean; error: object }> {
  //     try {
  //       const storeSchema = object({
  //         masterId: string().required(),
  //       });
  //       await storeSchema.validate(params);
  //       return { isValid: true, error: {} };
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         const { name, message } = error;
  //         return { error: { name, message }, isValid: false };
  //       }
  //       return {
  //         error: {
  //           name: "ValidationError",
  //           message: "Something went wrong!",
  //         },
  //         isValid: false,
  //       };
  //     }
  //   }

  async route(httpRequest: Request): Promise<IHttpResponse> {
    try {
      if (!httpRequest) throw new Error("Invalid Request");
      //   const { isValid, error } = await this.validate({
      //     masterId: httpRequest.userId,
      //   });
      //   if (!isValid) return HttpResponse.badRequest(error);
      const products = await this.#getProductsUseCase.execute();
      return HttpResponse.ok(products);
    } catch (error) {
      console.error("GetProductsRouter", error);
      if (error instanceof Error)
        return HttpResponse.serverError(error.message);
      return HttpResponse.serverError("FindStoreError");
    }
  }
}
