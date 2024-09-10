import express from "express";
import { json } from "express";
import setupRoutes from "./routes";

const app = express();

app.use(json());

setupRoutes(app);

export default app;
