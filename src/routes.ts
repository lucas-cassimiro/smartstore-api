import { Router } from "express";

import upload from "./middlewares/multerProducts";
import { authMiddleware } from "./middlewares/auth";

import { AddressController } from "./app/controllers/AddressesController";
import { CategorieController } from "./app/controllers/CategoriesController";
import { ColorController } from "./app/controllers/ColorsController";
//import { OrderController } from "./app/controllers/OrdersController";
import { OrderItemsController } from "./app/controllers/OrderItemsController";
import { ProductController } from "./app/controllers/ProductsController";
import { RatingController } from "./app/controllers/RatingsController";
import { StockController } from "./app/controllers/StocksController";
import { StorageController } from "./app/controllers/StoragesController";
import { UserController } from "./app/controllers/UsersController";

const routes = Router();

routes.get("/endereco/:id", new AddressController().show);
routes.post("/endereco", new AddressController().create);

routes.get("/categoria", new CategorieController().index);
routes.post("/categoria", new CategorieController().create);
routes.put("/categoria/:id", new CategorieController().update);

routes.get("/cores", new ColorController().index);
routes.post("/cores", new ColorController().create);
routes.put("/cores/:id", new ColorController().update);

routes.get("/pedidos", new OrderItemsController().index);

// routes.get("/", new OrderController().index);
// routes.get("/:id", new OrderController().show);
// routes.post("/", new OrderController().create);

routes.get("/produtos", new ProductController().index);
routes.get("/produtos/:param", new ProductController().show);
routes.post("/produtos", upload.single("file"), new ProductController().create);
routes.put("/produtos/:id", new ProductController().update);
routes.delete("/produtos/:id", new ProductController().destroy);

routes.get("/avaliacoes", new RatingController().index);
routes.post("/avaliacoes", new RatingController().create);

routes.get("/estoque", new StockController().index);
routes.put("/estoque/:id", new StockController().update);

routes.get("/armazenamento", new StorageController().index);
routes.post("/armazenamento", new StorageController().create);
routes.put("/armazenamento/:id", new StorageController().update);

routes.get("/usuarios", new UserController().index);
routes.get("/usuarios/profile", authMiddleware, new UserController().getProfile);
routes.post("/usuarios", new UserController().create);
routes.post("/usuarios/login", new UserController().login);
routes.put("/usuarios/:id", new UserController().update);

export default routes;
