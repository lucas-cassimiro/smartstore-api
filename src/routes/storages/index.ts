import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const storages = await prisma.storage.findMany({});
    res.json(storages);
});

router.post("/", async (req, res) => {
    const { capacity } = req.body;

    await prisma.storage.create({
        data: {
            capacity,
        },
    });

    res
        .status(200)
        .send({ message: "Novo armazenamento cadastrado na base de dados " });
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { capacity } = req.body;

    const storageExistentInDatabase = await prisma.color.findUnique({
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

    res.status(200).send({ message: "Armazenamento alterada na base de dados " });
});

export default router;
