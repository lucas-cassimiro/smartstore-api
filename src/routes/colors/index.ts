import express from "express";

import { ColorController } from "../../controllers/ColorController";

const colorRoutes = express.Router();

colorRoutes.get("/", new ColorController().getColor);
colorRoutes.post("/", new ColorController().create);
colorRoutes.put("/:id", new ColorController().edit);

export default colorRoutes;
