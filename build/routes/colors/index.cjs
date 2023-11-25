"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/colors/index.ts
var colors_exports = {};
__export(colors_exports, {
  default: () => colors_default
});
module.exports = __toCommonJS(colors_exports);
var import_express = __toESM(require("express"), 1);

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

// src/routes/colors/index.ts
var colorRoutes = import_express.default.Router();
colorRoutes.get("/", new ColorController().getColor);
colorRoutes.post("/", new ColorController().create);
colorRoutes.put("/:id", new ColorController().edit);
var colors_default = colorRoutes;
