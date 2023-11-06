import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";
import removeQuantityInStock from "../utils/quantityProductUtil";

const OrderController = {
    index: async (req: Request, res: Response) => {
        const orders = await prisma.order.findMany({
            include: {
                users: true,
            },
        });

        res.json(orders);
    },

    create: async (req: Request, res: Response) => {
        const { user_id, user_order } = req.body;

        let totalAmount = 0;
        const productIds: number[] = [];

        for (const element of user_order) {
            const produtinho = await prisma.product.findUnique({
                where: {
                    id: element.product_id,
                },
            });

            if (produtinho) {
                const unitPrice = Number(produtinho.price);
                const discount = Number(produtinho.discount);
                const quantity = Number(element.quantity);

                const totalValue = ((unitPrice * (100 - discount)) / 100) * quantity;

                totalAmount += totalValue;
                productIds.push(element.product_id);
            }
        }

        const createdOrderAndOrderItems = await prisma.$transaction(
            async (prisma) => {
                const createdItemInOrder = await prisma.order.create({
                    data: {
                        user_id: user_id,
                        order_date: new Date(),
                        total_amount: totalAmount,
                    },
                });

                const orderId = createdItemInOrder.id;

                const createdItemsInOrderItems = await Promise.all(
                    user_order.map(
                        async (orderItem: { product_id: number; quantity: number }) => {
                            const produtinho = await prisma.product.findUnique({
                                where: {
                                    id: orderItem.product_id,
                                },
                            });

                            if (produtinho) {
                                const unitPrice = Number(produtinho.price);
                                const discount = Number(produtinho.discount);
                                const quantity = Number(orderItem.quantity);
                                const totalPrice =
                  ((unitPrice * (100 - discount)) / 100) * quantity;

                                return await prisma.order_item.create({
                                    data: {
                                        order_id: orderId,
                                        product_id: orderItem.product_id,
                                        unit_price: unitPrice,
                                        discount: discount,
                                        total_price: totalPrice,
                                        quantity: quantity,
                                    },
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
            return res
                .status(201)
                .send({ message: "Novo pedido cadastrado na base de dados" });
        } else {
            return res
                .status(500)
                .send({ error: "Falha ao criar novo pedido na base de dados" });
        }
    },
};

export default OrderController;
