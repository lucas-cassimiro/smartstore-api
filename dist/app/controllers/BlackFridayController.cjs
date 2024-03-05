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

// src/app/controllers/BlackFridayController.ts
var BlackFridayController_exports = {};
__export(BlackFridayController_exports, {
  BlackFridayController: () => BlackFridayController
});
module.exports = __toCommonJS(BlackFridayController_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/app/controllers/BlackFridayController.ts
var BlackFridayController = class {
  async index(_req, res) {
    try {
      const blackFridayOffer = await clientPrisma_default.product.findMany({
        where: {
          black_friday_offer: true
        },
        include: {
          categories: true,
          colors: true,
          storages: true
        }
      });
      return res.status(200).json(blackFridayOffer);
    } catch (error) {
      return res.status(500).send({ message: "Erro ao buscar produtos em oferta Black Friday." });
    }
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { black_friday_offer } = req.body;
    const productExistentInDatabase = await clientPrisma_default.product.findUnique({
      where: {
        id
      }
    });
    if (!productExistentInDatabase) {
      return res.status(404).send({ message: "Produto n\xE3o existe na base de dados." });
    }
    try {
      await clientPrisma_default.product.update({
        where: {
          id
        },
        data: {
          black_friday_offer
        }
      });
    } catch (error) {
      return res.status(404).send({ message: "Erro ao atualizar produto." });
    }
    return res.status(200).send({ message: "Produto alterado na base de dados." });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlackFridayController
});
