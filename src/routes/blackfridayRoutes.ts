import { Router } from "express";

import { BlackFridayController } from "../app/controllers/BlackFridayController";

const blackfridayRoutes = Router();

blackfridayRoutes.get("/", new BlackFridayController().index);
blackfridayRoutes.put("/:id", new BlackFridayController().update);

export default blackfridayRoutes;
