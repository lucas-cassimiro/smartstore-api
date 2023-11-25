import express from "express";

import { StockController } from "../../controllers/stockController";

const stockRoutes = express.Router();

stockRoutes.get("/", new StockController().getStock);
stockRoutes.put("/:id", new StockController().edit);

export default stockRoutes;
