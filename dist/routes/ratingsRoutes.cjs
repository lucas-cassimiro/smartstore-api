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

// src/routes/ratingsRoutes.ts
var ratingsRoutes_exports = {};
__export(ratingsRoutes_exports, {
  default: () => ratingsRoutes_default
});
module.exports = __toCommonJS(ratingsRoutes_exports);
var import_express = require("express");

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/app/controllers/RatingsController.ts
var RatingController = class {
  async index(_req, res) {
    try {
      const ratings = await clientPrisma_default.rating.findMany({
        include: {
          products: true,
          users: true
        }
      });
      return res.json(ratings);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar avalia\xE7\xF5es do produto." });
    }
  }
  async create(req, res) {
    const { user_id, product_id, score, feedback } = req.body;
    try {
      await clientPrisma_default.rating.create({
        data: {
          user_id,
          product_id,
          score,
          feedback,
          quantity: 1
        }
      });
    } catch (error) {
      return res.status(500).send({ message: "Falha ao registrar a avalia\xE7\xE3o." });
    }
    res.status(200).send({ message: "Avalia\xE7\xE3o registrada no banco de dados." });
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { score, feedback } = req.body;
    try {
      await clientPrisma_default.rating.update({
        where: {
          id
        },
        data: {
          score,
          feedback
          //quantity: pegar a quantidade atual e somar +1
        }
      });
      return res.status(200).send({ message: "Avalia\xE7\xE3o cadastrada." });
    } catch (error) {
      return res.status(500).send({ message: "Erro ao atualizar avalia\xE7\xE3o." });
    }
  }
};

// src/routes/ratingsRoutes.ts
var ratingsRoutes = (0, import_express.Router)();
ratingsRoutes.get("/", new RatingController().index);
ratingsRoutes.post("/", new RatingController().create);
var ratingsRoutes_default = ratingsRoutes;
