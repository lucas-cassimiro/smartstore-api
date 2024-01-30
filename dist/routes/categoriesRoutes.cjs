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

// src/routes/categoriesRoutes.ts
var categoriesRoutes_exports = {};
__export(categoriesRoutes_exports, {
  default: () => categoriesRoutes_default
});
module.exports = __toCommonJS(categoriesRoutes_exports);
var import_express = require("express");

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/app/controllers/CategoriesController.ts
var CategorieController = class {
  async index(_req, res) {
    try {
      const categories = await clientPrisma_default.categorie.findMany();
      return res.json(categories);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar as categorias." });
    }
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
    return res.status(201).send({
      message: "Nova categoria de produtos cadastrada na base de dados"
    });
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;
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
  async destroy(req, res) {
    const id = Number(req.params.id);
    try {
      const categorieExistent = await clientPrisma_default.categorie.findUnique({
        where: {
          id
        }
      });
      if (!categorieExistent) {
        return res.status(400).send({
          message: "A categoria n\xE3o consta na base de dados."
        });
      }
      await clientPrisma_default.categorie.delete({
        where: {
          id
        }
      });
      return res.status(200).send({ message: "Categoria deletada com sucesso." });
    } catch (error) {
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover a categoria." });
    }
  }
};

// src/routes/categoriesRoutes.ts
var categoriesRoutes = (0, import_express.Router)();
categoriesRoutes.get("/", new CategorieController().index);
categoriesRoutes.post("/", new CategorieController().create);
categoriesRoutes.put("/:id", new CategorieController().update);
categoriesRoutes.delete("/:id", new CategorieController().destroy);
var categoriesRoutes_default = categoriesRoutes;
