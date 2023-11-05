import express from "express";

import ColorController from "../../controllers/colorController";

const colorRoutes = express.Router();

colorRoutes.get("/", ColorController.index);
colorRoutes.post("/", ColorController.create);
colorRoutes.put("/:id", ColorController.edit);

export default colorRoutes;
