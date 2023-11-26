import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";
import { RatingData } from "../../interfaces/RatingData";

export class RatingController {
    async index(_req: Request, res: Response) {
        const ratings = await prisma.rating.findMany({
            include: {
                products: true,
                users: true,
            },
        });

        return res.json(ratings);
    }

    async create(req: Request, res: Response) {
        const { user_id, product_id, score, feedback } = req.body as RatingData;

        try {
            await prisma.rating.create({
                data: {
                    user_id: user_id,
                    product_id: product_id,
                    score: score,
                    feedback: feedback,
                    quantity: 1,
                },
            });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Falha ao registrar a avaliação." });
        }

        res.status(200).send({ message: "Avaliação registrada no banco de dados." });
    }

    // async update (req: Request, res: Response) { },
}
