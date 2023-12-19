import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";

export class OrderItemsController {
    async index(_req: Request, res: Response) {
        try {
            const orderItems = await prisma.order_item.findMany({
                include: {
                    products: true,
                    orders: true,
                },
            });

            return res.json(orderItems);
        } catch (error) {
            res.status(500).send({ message: "Falha ao buscar os pedidos." });
        }
    }
}
