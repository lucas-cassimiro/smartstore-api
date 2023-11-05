import express from "express";
import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    const ratings = await prisma.rating.findMany({
        include: {
            products: true,
            users: true,
        },
    });

    res.json(ratings);
});

router.post("/", async (req: Request, res: Response) => {
    const { user_id, product_id, score } = req.body;

    try {
        const userExistentInDatabase = await prisma.user.findUnique({
            where: {
                id: user_id,
            },
        });

        const productExistentInDatabase = await prisma.product.findUnique({
            where: {
                id: product_id,
            },
        });

        if (!userExistentInDatabase && !productExistentInDatabase) {
            return res
                .status(404)
                .send({ message: "Usuário ou produto não encontrados" });
        }

        await prisma.rating.create({
            data: {
                user_id: user_id,
                product_id: product_id,
                score: score,
                quantity: 1,
            },
        });
    } catch (error) {
        return res.status(500).send({ message: "Falha ao registrar a avaliação" });
    }

    res.status(200).send({ message: "Avaliação registrada no banco de dados" });
});

export default router;
