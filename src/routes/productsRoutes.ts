import { Router } from "express";

import { ProductController } from "../app/controllers/ProductsController";

import upload from "../middlewares/multer";

const productsRoutes = Router();

productsRoutes.get("/", new ProductController().index);
productsRoutes.get("/:param", new ProductController().show);
productsRoutes.post("/", upload.single("file"), new ProductController().create);
productsRoutes.put("/:id", new ProductController().update);
productsRoutes.delete("/:id", new ProductController().destroy);

export default productsRoutes;
