import express from "express"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router()


router.get("/", async (_, res) => {
    const products = await prisma.stock.findMany({
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

    res.json(products);
});

// rota para cadastrar novas quantidades de estoque do produto específico que chegou na loja
// no front-end vamos mostrar a tabela STOCKS, pois os IDS de PRODUCTS e STOCKS são iguais (rota de cima).
// iremos mostrar também os nomes dos produtos, com seus respectivos ID's para conseguir mostrar a quantidade de cada um no estoque

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { status, purchase_price, expiry_date, updated_at, quantity } =
    req.body;

    try {
        const product = await prisma.stock.findUnique({
            where: {
                id,
            },
        });

        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado" });
        }

        await prisma.stock.update({
            where: {
                id,
            },
            data: {
                status: status,
                purchase_price: purchase_price,
                expiry_date: new Date(expiry_date),
                updated_at: new Date(updated_at),
                quantity: quantity,
            },
        });

        res.status(200).send();
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Falha ao atualizar o estoque do produto" });
    }
});

export default router