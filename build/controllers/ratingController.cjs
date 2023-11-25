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

// src/controllers/ratingController.ts
var ratingController_exports = {};
__export(ratingController_exports, {
  RatingController: () => RatingController
});
module.exports = __toCommonJS(ratingController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RatingController
});
