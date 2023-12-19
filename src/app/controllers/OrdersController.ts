import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";
import removeQuantityInStock from "../../utils/product/quantityProductUtil";
import { OrderData } from "../../interfaces/OrderData";

export class OrderController {
    async index(_req: Request, res: Response) {
        try {
            const orders = await prisma.order.findMany({
                include: {
                    users: true,
                },
            });
            return res.json(orders);
            
        } catch (error) {
            return res.status(500).send({ message: "Falha ao buscar os pedidos." });
        }
    }

    async show(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        //fazer verificações se o usuário existe etc

        const orders = await prisma.order.findMany({
            where: {
                user_id: id,
            },
        });

        return res.json(orders);
    }

    async create(req: Request, res: Response) {
        const { user_id, user_order } = req.body as OrderData;

        let totalAmount: number = 0;
        const productIds: number[] = [];

        for (const element of user_order) {
            const produtinho = await prisma.product.findUnique({
                where: {
                    id: element.product_id,
                },
            });

            if (produtinho) {
                const unitPrice: number = Number(produtinho.price);
                const discount: number = Number(produtinho.discount);
                const quantity: number = Number(element.quantity);

                const totalValue: number =
          ((unitPrice * (100 - discount)) / 100) * quantity;

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

                const orderId: number = createdItemInOrder.id;

                const createdItemsInOrderItems = await Promise.all(
                    user_order.map(
                        async (orderItem: { product_id: number; quantity: number }) => {
                            const produtinho = await prisma.product.findUnique({
                                where: {
                                    id: orderItem.product_id,
                                },
                            });

                            if (produtinho) {
                                const unitPrice: number = Number(produtinho.price);
                                const discount: number = Number(produtinho.discount);
                                const quantity: number = Number(orderItem.quantity);
                                const totalPrice: number =
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
                .send({ message: "Novo pedido cadastrado na base de dados." });
        } else {
            return res
                .status(500)
                .send({ error: "Falha ao criar novo pedido na base de dados." });
        }
    }
}
