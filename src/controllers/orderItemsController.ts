import prisma from "../../config/clientPrisma";

import { Request, Response } from "express";

const OrderItemsController = {
    index: async (req: Request, res: Response) => {
        const orderItems = await prisma.order_item.findMany({
            include: {
                products: true,
                orders: true,
            },
        });

        res.json(orderItems);
    },
};

export default OrderItemsController;
