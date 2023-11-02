import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const categories = await prisma.categorie.findMany({});
    res.json(categories);
});

router.post("/", async (req, res) => {
    const { name } = req.body;

    try {
        const categorieExistentInDatabase = await prisma.categorie.findFirst({
            where: {
                name
            },
        });

        if (categorieExistentInDatabase) {
            return res
                .status(404)
                .send({ message: "Categoria de produtos já existe na base de dados" });
        }

        await prisma.categorie.create({
            data: {
                name,
            },
        });
    } catch (error) {
        return res
            .status(404)
            .send({ message: "Erro ao cadastrar nova categoria de produtos" });
    }

    res.status(200).send({
        message: "Nova categoria de produtos cadastrada na base de dados",
    });
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    try {
        const categorieExistentInDatabase = await prisma.categorie.findUnique({
            where: {
                id,
            },
        });

        if (!categorieExistentInDatabase) {
            return res
                .status(400)
                .send({ message: "Categoria de produto não consta na base de dados " });
        }

        await prisma.categorie.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    } catch (error) {
        return res
            .status(404)
            .send({ message: "Falha ao cadastrar nova categoria na base de dados" });
    }

    res
        .status(200)
        .send({ message: "Categoria de produto alterada na base de dados " });
});

export default router;
