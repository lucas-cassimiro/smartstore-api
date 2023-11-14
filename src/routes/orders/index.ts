import express from "express";

import OrderController from "../../controllers/orderController";

const orderRoutes = express.Router();

orderRoutes.get("/", OrderController.index);
orderRoutes.post("/", OrderController.create);

export default orderRoutes;