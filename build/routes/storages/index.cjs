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

// src/routes/storages/index.ts
var storages_exports = {};
__export(storages_exports, {
  default: () => storages_default
});
module.exports = __toCommonJS(storages_exports);
var import_express = __toESM(require("express"), 1);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/storageController.ts
var StorageController = class {
  async getStorages(req, res) {
    const storages = await clientPrisma_default.storage.findMany({});
    res.json(storages);
  }
  async create(req, res) {
    const { capacity } = req.body;
    try {
      const storageExistentInDatabase = await clientPrisma_default.storage.findUnique({
        where: {
          capacity: Number(capacity)
        }
      });
      if (storageExistentInDatabase) {
        return res.status(404).send({
          message: "Armazenamento j\xE1 existente na base de dados"
        });
      }
      await clientPrisma_default.storage.create({
        data: {
          capacity: Number(capacity)
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao cadastrar novo armazenamento" });
    }
    res.status(200).send({
      message: "Novo armazenamento cadastrado na base de dados "
    });
  }
  async edit(req, res) {
    const id = Number(req.params.id);
    const { capacity } = req.body;
    try {
      const storageExistentInDatabase = await clientPrisma_default.storage.findUnique({
        where: {
          id
        }
      });
      if (!storageExistentInDatabase) {
        return res.status(400).send({ message: "Armazenamento n\xE3o consta na base de dados " });
      }
      await clientPrisma_default.storage.update({
        where: {
          id
        },
        data: {
          capacity: Number(capacity)
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao atualizar armazenamento" });
    }
    res.status(200).send({ message: "Armazenamento alterada na base de dados " });
  }
};

// src/routes/storages/index.ts
var storageRoutes = import_express.default.Router();
storageRoutes.get("/", new StorageController().getStorages);
storageRoutes.post("/", new StorageController().create);
storageRoutes.put("/:id", new StorageController().edit);
var storages_default = storageRoutes;
