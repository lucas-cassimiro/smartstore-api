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

    await prisma.categorie.create({
        data: {
            name,
        },
    });

    res.status(200).send({
        message: "Nova categoria de produtos cadastrada na base de dados",
    });
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { name } = req.body;

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

    res
        .status(200)
        .send({ message: "Categoria de produto alterada na base de dados " });
});

export default router;
