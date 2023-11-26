import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";

export class OrderItemsController {
    async index(_req: Request, res: Response) {
        const orderItems = await prisma.order_item.findMany({
            include: {
                products: true,
                orders: true,
            },
        });

        return res.json(orderItems);
    }
}
