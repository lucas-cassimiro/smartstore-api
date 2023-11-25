import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";

export class StockController {
    async index(req: Request, res: Response) {
        const productsInStock = await prisma.stock.findMany({
            include: {
                products: {
                    include: {
                        colors: true,
                        storages: true,
                        categories: true,
                    },
                },
            },
        });

        res.json(productsInStock);
    }

    async update(req: Request, res: Response) {
        const product_id = Number(req.params.id);

        const { status, purchase_price, expiry_date, updated_at, quantity } =
      req.body;

        try {
            const product = await prisma.stock.findUnique({
                where: {
                    product_id,
                },
            });

            if (!product) {
                return res
                    .status(404)
                    .send({ message: "Produto não existe na base de dados" });
            }

            const quantidadeAtual = product.quantity;

            await prisma.stock.update({
                where: {
                    product_id,
                },
                data: {
                    status: status,
                    purchase_price: purchase_price,
                    expiry_date: new Date(expiry_date),
                    updated_at: new Date(updated_at),
                    quantity: quantidadeAtual! + Number(quantity),
                },
            });

            return res
                .status(200)
                .send({ message: "Produto atualizado com sucesso" });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send({ message: "Falha ao atualizar o estoque do produto" });
        }
    }
}