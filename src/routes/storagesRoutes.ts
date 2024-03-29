import { Router } from "express";

import { StorageController } from "../app/controllers/StoragesController";

const storagesRoutes = Router();

storagesRoutes.get("/", new StorageController().index);
storagesRoutes.post("/", new StorageController().create);
storagesRoutes.put("/:id", new StorageController().update);
storagesRoutes.delete("/:id", new StorageController().destroy);

export default storagesRoutes;
