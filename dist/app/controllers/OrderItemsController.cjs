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

// src/app/controllers/OrderItemsController.ts
var OrderItemsController_exports = {};
__export(OrderItemsController_exports, {
  OrderItemsController: () => OrderItemsController
});
module.exports = __toCommonJS(OrderItemsController_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/app/controllers/OrderItemsController.ts
var OrderItemsController = class {
  async index(_req, res) {
    try {
      const orderItems = await clientPrisma_default.order_item.findMany({
        include: {
          products: true,
          orders: true
        }
      });
      return res.json(orderItems);
    } catch (error) {
      res.status(500).send({ message: "Falha ao buscar os pedidos." });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OrderItemsController
});
