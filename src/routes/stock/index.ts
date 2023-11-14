import express from "express";

import StockController from "../../controllers/stockController";

const stockRoutes = express.Router();

stockRoutes.get("/", StockController.index);
stockRoutes.put("/:id", StockController.edit);

export default stockRoutes;
