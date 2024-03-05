import { Router } from "express";

import { AddressController } from "../app/controllers/AddressesController";

const addressesRoutes = Router();

addressesRoutes.get("/:id", new AddressController().show);
addressesRoutes.post("/:id", new AddressController().create);
addressesRoutes.delete("/:id", new AddressController().delete);

export default addressesRoutes;
