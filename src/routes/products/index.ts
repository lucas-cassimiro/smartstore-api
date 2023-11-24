import express from "express";

import productController from "../../controllers/productController";

import upload from "../../middleware/multerProductImages";

const productsRoutes = express.Router();

productsRoutes.get("/", productController.index);
productsRoutes.get("/:param", productController.indexParam);
productsRoutes.post("/", upload.single("file"), productController.create);
productsRoutes.put("/:id", productController.edit);
productsRoutes.delete("/:id", productController.delete);

export default productsRoutes;
