import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";

interface Storage {
  capacity: number;
}

export class StorageController {
    async index(req: Request, res: Response) {
        const storages = await prisma.storage.findMany({});
        res.json(storages);
    }

    async create(req: Request, res: Response) {
        const { capacity } = req.body as Storage;

        try {
            const storageExistentInDatabase = await prisma.storage.findUnique({
                where: {
                    capacity: Number(capacity),
                },
            });

            if (storageExistentInDatabase) {
                return res.status(404).send({
                    message: "Armazenamento já existente na base de dados",
                });
            }

            await prisma.storage.create({
                data: {
                    capacity: Number(capacity),
                },
            });
        } catch (error) {
            console.log(error);
            return res
                .status(404)
                .send({ message: "Falha ao cadastrar novo armazenamento" });
        }

        res.status(200).send({
            message: "Novo armazenamento cadastrado na base de dados ",
        });
    }

    async update(req: Request, res: Response) {
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
                    capacity: Number(capacity),
                },
            });
        } catch (error) {
            console.log(error);
            return res
                .status(404)
                .send({ message: "Falha ao atualizar armazenamento" });
        }

        res
            .status(200)
            .send({ message: "Armazenamento alterada na base de dados " });
    }
}
