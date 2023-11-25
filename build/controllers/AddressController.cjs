"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/AddressController.ts
var AddressController_exports = {};
__export(AddressController_exports, {
  AddressController: () => AddressController
});
module.exports = __toCommonJS(AddressController_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/AddressController.ts
var AddressController = class {
  async getAddress(req, res) {
    try {
      const id = Number(req.params.id);
      const findUser = await clientPrisma_default.user.findUnique({
        where: {
          id
        }
      });
      if (!findUser) {
        return res.status(404).send({ message: "Usu\xE1rio n\xE3o existe na base de dados." });
      }
      const address = await clientPrisma_default.address.findMany({
        where: {
          user_id: id
        }
      });
      return res.json(address);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel buscar o endere\xE7o." });
    }
  }
  async create(req, res) {
    const {
      user_id,
      street_address,
      number_address,
      complement,
      neighborhood,
      city,
      state,
      recipient
    } = req.body;
    try {
      await clientPrisma_default.address.create({
        data: {
          user_id,
          street_address,
          number_address: Number(number_address),
          complement,
          neighborhood,
          city,
          state,
          recipient
        }
      });
      return res.status(201).send({ message: "Novo endere\xE7o cadastrado na base de dados." });
    } catch (error) {
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel cadastrar um novo endere\xE7o." });
    }
  }
  // async update(req: Request, res: Response) {
  /// }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressController
});
