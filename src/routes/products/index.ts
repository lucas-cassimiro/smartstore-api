import express from "express";

import { ProductController } from "../../controllers/productController";

import upload from "../../middleware/multerProductImages";

const productsRoutes = express.Router();

productsRoutes.get("/", new ProductController().getProducts);
productsRoutes.get("/:param", new ProductController().getProductsParam);
productsRoutes.post("/", upload.single("file"), new ProductController().create);
productsRoutes.put("/:id", new ProductController().edit);
productsRoutes.delete("/:id", new ProductController().delete);

export default productsRoutes;
