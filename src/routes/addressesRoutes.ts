import { Router } from "express";

import { AddressController } from "../app/controllers/AddressesController";

const addressesRoutes = Router();

addressesRoutes.post("/", new AddressController().create);
addressesRoutes.get("/:id", new AddressController().show);

export default addressesRoutes;
