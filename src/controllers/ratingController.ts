import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";

const RatingController = {
    index: async (req: Request, res: Response) => {
        const ratings = await prisma.rating.findMany({
            include: {
                products: true,
                users: true,
            },
        });

        res.json(ratings);
    },

    create: async (req: Request, res: Response) => {
        const { user_id, product_id, score } = req.body;

        try {
            await prisma.rating.create({
                data: {
                    user_id: user_id,
                    product_id: product_id,
                    score: score,
                    quantity: 1,
                },
            });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Falha ao registrar a avaliação" });
        }

        res.status(200).send({ message: "Avaliação registrada no banco de dados" });
    },

    edit: async (req: Request, res: Response) => {},
};

export default RatingController;
