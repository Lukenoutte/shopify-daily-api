import express from "express";
import { json } from "express";
import setupRoutes from "./routes";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors({ origin: "http://localhost:3000" }));

setupRoutes(app);

export default app;
