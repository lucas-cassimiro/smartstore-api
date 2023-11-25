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

// src/routes/stocks/index.ts
var stocks_exports = {};
__export(stocks_exports, {
  default: () => stocks_default
});
module.exports = __toCommonJS(stocks_exports);
var import_express = __toESM(require("express"), 1);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/StockController.ts
var StockController = class {
  async getStock(req, res) {
    const productsInStock = await clientPrisma_default.stock.findMany({
      include: {
        products: {
          include: {
            colors: true,
            storages: true,
            categories: true
          }
        }
      }
    });
    res.json(productsInStock);
  }
  async edit(req, res) {
    const product_id = Number(req.params.id);
    const { status, purchase_price, expiry_date, updated_at, quantity } = req.body;
    try {
      const product = await clientPrisma_default.stock.findUnique({
        where: {
          product_id
        }
      });
      if (!product) {
        return res.status(404).send({ message: "Produto n\xE3o existe na base de dados" });
      }
      const quantidadeAtual = product.quantity;
      await clientPrisma_default.stock.update({
        where: {
          product_id
        },
        data: {
          status,
          purchase_price,
          expiry_date: new Date(expiry_date),
          updated_at: new Date(updated_at),
          quantity: quantidadeAtual + Number(quantity)
        }
      });
      return res.status(200).send({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Falha ao atualizar o estoque do produto" });
    }
  }
};

// src/routes/stocks/index.ts
var stockRoutes = import_express.default.Router();
stockRoutes.get("/", new StockController().getStock);
stockRoutes.put("/:id", new StockController().edit);
var stocks_default = stockRoutes;
