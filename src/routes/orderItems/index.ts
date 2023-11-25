import express from "express";

import { OrderItemsController } from "../../controllers/orderItemsController";

const orderItemsRoutes = express.Router();

orderItemsRoutes.get("/", new OrderItemsController().getOrderItem);

// colorRoutes.post("/", ColorController.create);
// colorRoutes.put("/:id", ColorController.edit);

export default orderItemsRoutes;
