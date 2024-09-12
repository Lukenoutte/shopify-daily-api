import express from "express";
import { json } from "express";
import setupRoutes from "./routes";
import cors from "cors";
import { appUrl } from "./env";

const app = express();

app.use(json());
app.use(cors({ origin: appUrl }));

setupRoutes(app);

export default app;
