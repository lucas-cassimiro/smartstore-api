import { Router } from "express";

import { CategorieController } from "../app/controllers/CategoriesController";

const categoriesRoutes = Router();

categoriesRoutes.get("/", new CategorieController().index);
categoriesRoutes.post("/", new CategorieController().create);
categoriesRoutes.put("/:id", new CategorieController().update);
categoriesRoutes.delete("/:id", new CategorieController().destroy);

export default categoriesRoutes;
