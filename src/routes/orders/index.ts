import express from "express";
import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

import currencyFormat from "../../utils/currencyFormatUtils";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        include: {
            users: true,
        },
    });

    res.json(orders);
});

router.post("/", async (req: Request, res: Response) => {
    const { user_id, user_order } = req.body;

    const products: any[] = [];

    for (const element of user_order) {
        const produtinho = await prisma.product.findFirst({
            where: {
                id: element.product_id,
            },
        });

        const calcTotalAmount =
      ((Number(produtinho?.price) * (100 - Number(produtinho?.discount))) /
        100) *
      Number(element.quantity);

        products.push({
            user_id: user_id,
            order_date: new Date(),
            total_amount: calcTotalAmount.toFixed(2),
        });
    }

    const peidei = await prisma.order.createMany({
        data: products,
    });

    console.log(peidei.count);

    /*  
        product_id,
        unit_price === valor TOTAL  DA COMPRA
        discount === desconto TOTAL DA COMPRA
        total_price 

    
    
    */
});

export default router;
