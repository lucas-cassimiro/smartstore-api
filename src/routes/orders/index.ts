import express from "express";

import { OrderController } from "../../controllers/orderController";

const orderRoutes = express.Router();

orderRoutes.get("/", new OrderController().getOrder);
orderRoutes.get("/:id", new OrderController().getOrderParam);
orderRoutes.post("/", new OrderController().create);

export default orderRoutes;
