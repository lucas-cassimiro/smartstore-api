import { Router } from "express";

import { StockController } from "../app/controllers/StocksController";

const stocksRoutes = Router();

stocksRoutes.get("/", new StockController().index);
stocksRoutes.put("/:id", new StockController().update);

export default stocksRoutes;
