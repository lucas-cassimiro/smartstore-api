import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";
import { RatingData } from "../../interfaces/RatingData";

export class RatingController {
    async index(_req: Request, res: Response) {
        try {
            const ratings = await prisma.rating.findMany({
                include: {
                    products: true,
                    users: true,
                },
            });

            return res.json(ratings);
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Falha ao buscar avaliações do produto." });
        }
    }

    async create(req: Request, res: Response) {
        const { user_id, product_id, score, feedback } = req.body as RatingData;

        try {
            await prisma.rating.create({
                data: {
                    user_id,
                    product_id,
                    score,
                    feedback,
                    quantity: 1,
                },
            });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Falha ao registrar a avaliação." });
        }

        res
            .status(200)
            .send({ message: "Avaliação registrada no banco de dados." });
    }

    async update(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        const { score, feedback } = req.body as RatingData;

        try {
            await prisma.rating.update({
                where: {
                    id,
                },
                data: {
                    score,
                    feedback,
                    //quantity: pegar a quantidade atual e somar +1
                },
            });

            return res.status(200).send({ message: "Avaliação cadastrada." });
        } catch (error) {
            return res.status(500).send({ message: "Erro ao atualizar avaliação." });
        }
    }
}
