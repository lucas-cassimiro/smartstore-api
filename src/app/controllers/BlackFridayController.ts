import prisma from "../../../config/clientPrisma";
import { Request, Response } from "express";

interface BlackFridayOfferData {
  black_friday_offer: boolean;
}

export class BlackFridayController {
    async index(_req: Request, res: Response) {
        try {
            const blackFridayOffer = await prisma.product.findMany({
                where: {
                    black_friday_offer: true,
                },
                include: {
                    categories: true,
                    colors: true,
                    storages: true,
                },
            });

            return res.status(200).json(blackFridayOffer);
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Erro ao buscar produtos em oferta Black Friday." });
        }
    }

    async update(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        const { black_friday_offer } = req.body as BlackFridayOfferData;

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
                    black_friday_offer,
                },
            });
        } catch (error) {
            return res.status(404).send({ message: "Erro ao atualizar produto." });
        }

        return res
            .status(200)
            .send({ message: "Produto alterado na base de dados." });
    }
}
