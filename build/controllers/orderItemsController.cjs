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

// src/controllers/orderItemsController.ts
var orderItemsController_exports = {};
__export(orderItemsController_exports, {
  OrderItemsController: () => OrderItemsController
});
module.exports = __toCommonJS(orderItemsController_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/orderItemsController.ts
var OrderItemsController = class {
  async getOrderItem(req, res) {
    const orderItems = await clientPrisma_default.order_item.findMany({
      include: {
        products: true,
        orders: true
      }
    });
    res.json(orderItems);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OrderItemsController
});
