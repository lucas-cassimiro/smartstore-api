import express from "express";

import { AddressController } from "../../controllers/AddressController";

const addressRoutes = express.Router();

addressRoutes.get("/:id", new AddressController().getAddress);
addressRoutes.post("/", new AddressController().create);
//addressRouter.put("/:id", ColorController.edit);

export default addressRoutes;
