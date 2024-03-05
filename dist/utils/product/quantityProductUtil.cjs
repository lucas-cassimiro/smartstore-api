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

// src/utils/product/quantityProductUtil.ts
var quantityProductUtil_exports = {};
__export(quantityProductUtil_exports, {
  default: () => removeQuantityInStock
});
module.exports = __toCommonJS(quantityProductUtil_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/utils/product/quantityProductUtil.ts
async function removeQuantityInStock(userOrder) {
  for (const item of userOrder) {
    const findProductStock = await clientPrisma_default.stock.findUnique({
      where: {
        product_id: item.product_id
      }
    });
    const editProductStock = await clientPrisma_default.stock.update({
      where: {
        product_id: item.product_id
      },
      data: {
        quantity: Number(findProductStock?.quantity) - Number(item.quantity)
      }
    });
    if (editProductStock) {
      if (editProductStock.quantity <= 0) {
        await clientPrisma_default.stock.update({
          where: {
            product_id: item.product_id
          },
          data: {
            status: "Indispon\xEDvel"
          }
        });
      }
    }
  }
}
