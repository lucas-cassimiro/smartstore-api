import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";

export class HighlightController {
    async index(_req: Request, res: Response) {
        try {
            const highlightedProducts = await prisma.product.findMany({
                where: {
                    highlight: true,
                },
                include: {
                    categories: true,
                    colors: true,
                    storages: true,
                },
            });

            return res.status(200).json(highlightedProducts);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erro ao buscar produtos em destaque." });
        }
    }

    async update(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        const { highlight } = req.body;

        const productExistentInDatabase = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!productExistentInDatabase) {
            return res
                .status(404)
                .send({ message: "Produto não existe na base de dados." });
        }

        try {
            await prisma.product.update({
                where: {
                    id,
                },
                data: {
                    highlight
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(404).send({ message: "Erro ao atualizar produto." });
        }

        return res
            .status(200)
            .send({ message: "Produto alterado na base de dados." });
    }
}
