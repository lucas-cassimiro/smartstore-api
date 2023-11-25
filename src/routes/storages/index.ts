import express from "express";

import { StorageController } from "../../controllers/StorageController";

const storageRoutes = express.Router();

storageRoutes.get("/", new StorageController().getStorages);
storageRoutes.post("/", new StorageController().create);
storageRoutes.put("/:id", new StorageController().edit);

export default storageRoutes;
