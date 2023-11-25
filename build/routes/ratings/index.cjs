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

// src/routes/ratings/index.ts
var ratings_exports = {};
__export(ratings_exports, {
  default: () => ratings_default
});
module.exports = __toCommonJS(ratings_exports);
var import_express = __toESM(require("express"), 1);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/ratingController.ts
var RatingController = class {
  async getRating(req, res) {
    const ratings = await clientPrisma_default.rating.findMany({
      include: {
        products: true,
        users: true
      }
    });
    res.json(ratings);
  }
  async create(req, res) {
    const { user_id, product_id, score } = req.body;
    try {
      await clientPrisma_default.rating.create({
        data: {
          user_id,
          product_id,
          score,
          quantity: 1
        }
      });
    } catch (error) {
      return res.status(500).send({ message: "Falha ao registrar a avalia\xE7\xE3o" });
    }
    res.status(200).send({ message: "Avalia\xE7\xE3o registrada no banco de dados" });
  }
  // async edit (req: Request, res: Response) { },
};

// src/routes/ratings/index.ts
var ratingRoutes = import_express.default.Router();
ratingRoutes.get("/", new RatingController().getRating);
ratingRoutes.post("/", new RatingController().create);
var ratings_default = ratingRoutes;
