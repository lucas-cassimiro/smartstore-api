import { Router } from "express";

import { OrderItemsController } from "../app/controllers/OrderItemsController";

const orderItemsRoutes = Router();

orderItemsRoutes.get("/", new OrderItemsController().index);

export default orderItemsRoutes;
