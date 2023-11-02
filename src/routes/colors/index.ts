import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const colors = await prisma.color.findMany({});
    res.json(colors);
});

router.post("/", async (req, res) => {
    const { name } = req.body;

    try {
        const colorExistentInDatabase = await prisma.color.findFirst({
            where: {
                name,
            },
        });

        if (colorExistentInDatabase) {
            return res
                .status(400)
                .send({ message: "Cor já existente na base de dados" });
        }

        await prisma.color.create({
            data: {
                name,
            },
        });
    } catch (error) {
        return res.status(404).send({ message: "Falha ao cadastrar nova cor " });
    }

    res.status(200).send({ message: "Nova cor cadastrada na base de dados " });
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    try {
        const colorExistentInDatabase = await prisma.color.findUnique({
            where: {
                id,
            },
        });

        if (!colorExistentInDatabase) {
            return res
                .status(400)
                .send({ message: "Cor não consta na base de dados " });
        }

        await prisma.color.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    } catch (error) {
        return res.status(404).send({ message: "Falha ao cadastrar nova cor" });
    }

    res.status(200).send({ message: "Cor alterada na base de dados " });
});

export default router;
