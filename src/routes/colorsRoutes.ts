import { Router } from "express";

import { ColorController } from "../app/controllers/ColorsController";

const colorsRoutes = Router();

colorsRoutes.get("/", new ColorController().index);
colorsRoutes.post("/", new ColorController().create);
colorsRoutes.put("/:id", new ColorController().update);
colorsRoutes.delete("/:id", new ColorController().destroy);

export default colorsRoutes;
