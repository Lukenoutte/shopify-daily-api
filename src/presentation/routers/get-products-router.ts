import { string, object, number } from "yup";
import HttpResponse from "../helpers/http-response";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";
import { Request } from "express";
import { IGetProductsUseCase } from "domain/usecases/@interfaces/usecases.interfaces";
import { IRouter } from "./@interfaces/router.interfaces";

export default class GetProductsRouter implements IRouter {
  #getProductsUseCase;

  constructor({
    getProductsUseCase,
  }: {
    getProductsUseCase: IGetProductsUseCase;
  }) {
    this.#getProductsUseCase = getProductsUseCase;
  }

  async validate(params: {
    fullTextSearch?: string;
    limit?: number;
    offset?: number;
    priceMin?: number;
    priceMax?: number;
  }): Promise<{ isValid: boolean; error: object }> {
    try {
      const storeSchema = object({
        fullTextSearch: string().optional(),
        limit: number().optional(),
        offset: number().optional(),
        priceMin: number().optional(),
        priceMax: number().optional(),
      });
      await storeSchema.validate(params);
      return { isValid: true, error: {} };
    } catch (error) {
      if (error instanceof Error) {
        const { name, message } = error;
        return { error: { name, message }, isValid: false };
      }
      return {
        error: {
          name: "ValidationError",
          message: "Something went wrong!",
        },
        isValid: false,
      };
    }
  }

  async route(httpRequest: Request): Promise<IHttpResponse> {
    try {
      if (!httpRequest || !httpRequest.query)
        throw new Error("Invalid Request");
      const { fts, limit, offset, priceMin, priceMax } = httpRequest.query;
      const query = {
        fullTextSearch: fts ? (fts as string) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        offset: offset ? parseInt(offset as string, 10) : undefined,
        priceMin: priceMin ? parseInt(priceMin as string, 10) : undefined,
        priceMax: priceMax ? parseInt(priceMax as string, 10) : undefined,
      };
      const { isValid, error } = await this.validate(query);
      if (!isValid) return HttpResponse.badRequest(error);
      const products = await this.#getProductsUseCase.execute(query);
      return HttpResponse.ok(products);
    } catch (error) {
      console.error("GetProductsRouter", error);
      if (error instanceof Error)
        return HttpResponse.serverError(error.message);
      return HttpResponse.serverError("FindStoreError");
    }
  }
}
