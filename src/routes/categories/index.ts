import express from "express";

import { CategorieController } from "../../controllers/CategoriesController";

const categorieRoutes = express.Router();

categorieRoutes.get("/", new CategorieController().getCategorie);
categorieRoutes.post("/", new CategorieController().create);
categorieRoutes.put("/:id", new CategorieController().edit);

// router.delete("/:id", CategoriesController.delete);

export default categorieRoutes;
