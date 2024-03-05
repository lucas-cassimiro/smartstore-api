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

// src/routes/ordersRoutes.ts
var ordersRoutes_exports = {};
__export(ordersRoutes_exports, {
  default: () => ordersRoutes_default
});
module.exports = __toCommonJS(ordersRoutes_exports);
var import_express = require("express");

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

// src/app/controllers/OrdersController.ts
var OrderController = class {
  async index(_req, res) {
    try {
      const orders = await clientPrisma_default.order.findMany({
        include: {
          users: true
        }
      });
      return res.json(orders);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar os pedidos." });
    }
  }
  async show(req, res) {
    const id = Number(req.params.id);
    const orders = await clientPrisma_default.order.findMany({
      where: {
        user_id: id
      }
    });
    return res.json(orders);
  }
  async create(req, res) {
    const { user_id, user_order } = req.body;
    let totalAmount = 0;
    const productIds = [];
    for (const element of user_order) {
      const produtinho = await clientPrisma_default.product.findUnique({
        where: {
          id: element.product_id
        }
      });
      if (produtinho) {
        const unitPrice = Number(produtinho.price);
        const discount = Number(produtinho.discount);
        const quantity = Number(element.quantity);
        const totalValue = unitPrice * (100 - discount) / 100 * quantity;
        totalAmount += totalValue;
        productIds.push(element.product_id);
      }
    }
    const createdOrderAndOrderItems = await clientPrisma_default.$transaction(
      async (prisma2) => {
        const createdItemInOrder = await prisma2.order.create({
          data: {
            user_id,
            order_date: /* @__PURE__ */ new Date(),
            total_amount: totalAmount
          }
        });
        const orderId = createdItemInOrder.id;
        const createdItemsInOrderItems = await Promise.all(
          user_order.map(
            async (orderItem) => {
              const produtinho = await prisma2.product.findUnique({
                where: {
                  id: orderItem.product_id
                }
              });
              if (produtinho) {
                const unitPrice = Number(produtinho.price);
                const discount = Number(produtinho.discount);
                const quantity = Number(orderItem.quantity);
                const totalPrice = unitPrice * (100 - discount) / 100 * quantity;
                return await prisma2.order_item.create({
                  data: {
                    order_id: orderId,
                    product_id: orderItem.product_id,
                    unit_price: unitPrice,
                    discount,
                    total_price: totalPrice,
                    quantity
                  }
                });
              }
            }
          )
        );
        return { createdItemInOrder, createdItemsInOrderItems };
      }
    );
    if (createdOrderAndOrderItems) {
      removeQuantityInStock(user_order);
      return res.status(201).send({ message: "Novo pedido cadastrado na base de dados." });
    } else {
      return res.status(500).send({ error: "Falha ao criar novo pedido na base de dados." });
    }
  }
};

// src/routes/ordersRoutes.ts
var ordersRoutes = (0, import_express.Router)();
ordersRoutes.get("/", new OrderController().index);
ordersRoutes.get("/:id", new OrderController().show);
ordersRoutes.post("/", new OrderController().create);
var ordersRoutes_default = ordersRoutes;
