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

// src/controllers/ColorController.ts
var ColorController_exports = {};
__export(ColorController_exports, {
  ColorController: () => ColorController
});
module.exports = __toCommonJS(ColorController_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/ColorController.ts
var ColorController = class {
  async getColor(req, res) {
    const colors = await clientPrisma_default.color.findMany({});
    res.json(colors);
  }
  async create(req, res) {
    const { name } = req.body;
    try {
      const colorExistentInDatabase = await clientPrisma_default.color.findFirst({
        where: {
          name
        }
      });
      if (colorExistentInDatabase) {
        return res.status(400).send({ message: "Cor j\xE1 existente na base de dados" });
      }
      await clientPrisma_default.color.create({
        data: {
          name
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao cadastrar nova cor " });
    }
    res.status(200).send({ message: "Nova cor cadastrada na base de dados " });
  }
  async edit(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
      const colorExistentInDatabase = await clientPrisma_default.color.findUnique({
        where: {
          id
        }
      });
      if (!colorExistentInDatabase) {
        return res.status(400).send({ message: "Cor n\xE3o consta na base de dados " });
      }
      await clientPrisma_default.color.update({
        where: {
          id
        },
        data: {
          name
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao cadastrar nova cor" });
    }
    res.status(200).send({ message: "Cor alterada na base de dados " });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColorController
});
