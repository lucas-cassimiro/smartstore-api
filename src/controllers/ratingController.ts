import prisma from "../../config/clientPrisma";

import { Request, Response } from "express";

export class RatingController {
    async getRating(req: Request, res: Response) {
        const ratings = await prisma.rating.findMany({
            include: {
                products: true,
                users: true,
            },
        });

        res.json(ratings);
    }

    async create(req: Request, res: Response) {
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
    }

    // async edit (req: Request, res: Response) { },
}
