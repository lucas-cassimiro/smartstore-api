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

// src/routes/addressesRoutes.ts
var addressesRoutes_exports = {};
__export(addressesRoutes_exports, {
  default: () => addressesRoutes_default
});
module.exports = __toCommonJS(addressesRoutes_exports);
var import_express = require("express");

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/app/controllers/AddressesController.ts
var AddressController = class {
  async show(req, res) {
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
      recipient,
      cep
    } = req.body;
    try {
      const addressExistent = await clientPrisma_default.address.findUnique({
        where: {
          cep
        }
      });
      if (addressExistent)
        return res.status(400).send({ message: "Endere\xE7o j\xE1 cadastrado." });
      await clientPrisma_default.address.create({
        data: {
          user_id,
          street_address,
          number_address: Number(number_address),
          complement,
          neighborhood,
          city,
          state,
          recipient,
          cep
        }
      });
      return res.status(201).send({ message: "Novo endere\xE7o cadastrado na base de dados." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel cadastrar um novo endere\xE7o." });
    }
  }
  // async update(req: Request, res: Response) {
  //     const id: number = Number(req.params.id);
  //     const {
  //         street_address,
  //         number_address,
  //         complement,
  //         neighborhood,
  //         city,
  //         state,
  //         recipient,
  //         cep,
  //     } = req.body;
  // }
  async delete(req, res) {
    const id = Number(req.params.id);
    try {
      await clientPrisma_default.address.delete({
        where: {
          id
        }
      });
      return res.status(200).send({ message: "Endere\xE7o removido." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover o endere\xE7o." });
    }
  }
};

// src/routes/addressesRoutes.ts
var addressesRoutes = (0, import_express.Router)();
addressesRoutes.get("/:id", new AddressController().show);
addressesRoutes.post("/", new AddressController().create);
addressesRoutes.delete("/:id", new AddressController().delete);
var addressesRoutes_default = addressesRoutes;
