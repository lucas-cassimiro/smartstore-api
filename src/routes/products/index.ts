import express from "express";

import productController from "../../controllers/ProductController";

const productsRoutes = express.Router();

productsRoutes.get("/", productController.index);
productsRoutes.get("/:param", productController.indexParam);
productsRoutes.post("/", productController.create);
productsRoutes.put("/:id", productController.edit);
productsRoutes.delete("/:id", productController.delete);

export default productsRoutes;
