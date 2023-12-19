import { Router } from "express";

import { OrderController } from "../app/controllers/OrdersController";

const ordersRoutes = Router();

ordersRoutes.get("/", new OrderController().index);
ordersRoutes.get("/:id", new OrderController().show);
ordersRoutes.post("/", new OrderController().create);

export default ordersRoutes;
