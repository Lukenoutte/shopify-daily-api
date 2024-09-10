import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import GetProductsComposer from "../../composers/get-products-composer";
import { Router } from "express";

export default (router: Router) => {
  router.get(
    "/products",
    ExpressRouterAdapter.adapt(GetProductsComposer.compose()),
  );
};
