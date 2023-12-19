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

// src/routes/stocksRoutes.ts
var stocksRoutes_exports = {};
__export(stocksRoutes_exports, {
  default: () => stocksRoutes_default
});
module.exports = __toCommonJS(stocksRoutes_exports);
var import_express = require("express");

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/app/controllers/StocksController.ts
var StockController = class {
  async index(_req, res) {
    try {
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
      return res.json(productsInStock);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar estoque dos produtos." });
    }
  }
  async update(req, res) {
    const product_id = Number(req.params.id);
    const { status, purchase_price, expiry_date, quantity } = req.body;
    try {
      const product = await clientPrisma_default.stock.findUnique({
        where: {
          product_id
        }
      });
      if (!product) {
        return res.status(404).send({ message: "Produto n\xE3o existe na base de dados." });
      }
      const quantidadeAtual = product.quantity;
      const expiryDate = expiry_date ? new Date(expiry_date) : void 0;
      await clientPrisma_default.stock.update({
        where: {
          product_id
        },
        data: {
          status,
          purchase_price,
          expiry_date: expiryDate,
          updated_at: /* @__PURE__ */ new Date(),
          quantity: quantidadeAtual + Number(quantity)
        }
      });
      return res.status(200).send({ message: "Produto atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Falha ao atualizar o estoque do produto." });
    }
  }
};

// src/routes/stocksRoutes.ts
var stocksRoutes = (0, import_express.Router)();
stocksRoutes.get("/", new StockController().index);
stocksRoutes.put("/:id", new StockController().update);
var stocksRoutes_default = stocksRoutes;
