/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";

export interface IRouter {
  validate?: (params: any) => Promise<{ isValid: boolean; error: object }>;
  route: (httpRequest: Request) => Promise<IHttpResponse>;
}
