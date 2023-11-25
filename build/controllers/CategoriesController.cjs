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

// src/controllers/CategoriesController.ts
var CategoriesController_exports = {};
__export(CategoriesController_exports, {
  CategorieController: () => CategorieController
});
module.exports = __toCommonJS(CategoriesController_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/CategoriesController.ts
var CategorieController = class {
  async getCategorie(req, res) {
    const categories = await clientPrisma_default.categorie.findMany({});
    res.json(categories);
  }
  async create(req, res) {
    const { name } = req.body;
    try {
      const categorieExistentInDatabase = await clientPrisma_default.categorie.findUnique({
        where: {
          name
        }
      });
      if (categorieExistentInDatabase) {
        return res.status(404).send({
          message: "Categoria de produtos j\xE1 existe na base de dados"
        });
      }
      await clientPrisma_default.categorie.create({
        data: {
          name
        }
      });
    } catch (error) {
      return res.status(404).send({ message: "Erro ao cadastrar nova categoria de produtos" });
    }
    res.status(200).send({
      message: "Nova categoria de produtos cadastrada na base de dados"
    });
  }
  async edit(req, res) {
    const { name } = req.body;
    const { id } = req.body;
    try {
      const categorieExistentInDatabase = await clientPrisma_default.categorie.findUnique({
        where: {
          id
        }
      });
      if (!categorieExistentInDatabase) {
        return res.status(400).send({
          message: "Categoria de produto n\xE3o consta na base de dados "
        });
      }
      await clientPrisma_default.categorie.update({
        where: {
          id
        },
        data: {
          name
        }
      });
    } catch (error) {
      return res.status(404).send({
        message: "Falha ao cadastrar nova categoria na base de dados"
      });
    }
    return res.status(200).send({ message: "Categoria de produto alterada na base de dados " });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CategorieController
});
