import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

interface Storage {
  capacity: number;
}

router.get("/", async (req, res) => {
    const storages = await prisma.storage.findMany({});
    res.json(storages);
});

router.post("/", async (req, res) => {
    const { capacity } = req.body as Storage;

    try {
        const storageExistentInDatabase = await prisma.storage.findUnique({
            where: {
                capacity,
            },
        });

        if (storageExistentInDatabase) {
            return res
                .status(404)
                .send({ message: "Armazenamento já existente na base de dados" });
        }

        await prisma.storage.create({
            data: {
                capacity,
            },
        });
    } catch (error) {
        console.log(error);
        return res
            .status(404)
            .send({ message: "Falha ao cadastrar novo armazenamento" });
    }

    res
        .status(200)
        .send({ message: "Novo armazenamento cadastrado na base de dados " });
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { capacity } = req.body;

    try {
        const storageExistentInDatabase = await prisma.storage.findUnique({
            where: {
                id,
            },
        });

        if (!storageExistentInDatabase) {
            return res
                .status(400)
                .send({ message: "Armazenamento não consta na base de dados " });
        }

        await prisma.storage.update({
            where: {
                id,
            },
            data: {
                capacity,
            },
        });
    } catch (error) {
        return res
            .status(404)
            .send({ message: "Falha ao atualizar armazenamento" });
    }

    res.status(200).send({ message: "Armazenamento alterada na base de dados " });
});

export default router;
