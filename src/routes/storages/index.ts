import express from "express";

import StorageController from "../../controllers/storageController";

const storageRoutes = express.Router();

storageRoutes.get("/", StorageController.index);
storageRoutes.post("/", StorageController.create);
storageRoutes.put("/:id", StorageController.edit);

export default storageRoutes;
