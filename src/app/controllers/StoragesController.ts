import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";

import { StorageData } from "../../interfaces/StorageData";

export class StorageController {
    async index(_req: Request, res: Response) {
        try {
            const storages = await prisma.storage.findMany();
            return res.json(storages);
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Falha ao buscar armazenamento." });
        }
    }

    async create(req: Request, res: Response) {
        const { capacity } = req.body as StorageData;

        try {
            const storageExistentInDatabase = await prisma.storage.findUnique({
                where: {
                    capacity: Number(capacity),
                },
            });

            if (storageExistentInDatabase) {
                return res.status(404).send({
                    message: "Armazenamento já existente na base de dados.",
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
                .send({ message: "Falha ao cadastrar novo armazenamento." });
        }

        res.status(200).send({
            message: "Novo armazenamento cadastrado na base de dados.",
        });
    }

    async update(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        const { capacity } = req.body as StorageData;

        try {
            const storageExistentInDatabase = await prisma.storage.findUnique({
                where: {
                    id,
                },
            });

            if (!storageExistentInDatabase) {
                return res
                    .status(400)
                    .send({ message: "Armazenamento não consta na base de dados." });
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
                .send({ message: "Falha ao atualizar armazenamento." });
        }

        res
            .status(200)
            .send({ message: "Armazenamento alterada na base de dados." });
    }

    async destroy(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        try {
            const storageExistent = await prisma.storage.findUnique({
                where: {
                    id,
                },
            });

            if (!storageExistent) {
                return res
                    .status(400)
                    .send({ message: "O armazenamento não consta na base de dados." });
            }

            await prisma.storage.delete({
                where: {
                    id,
                },
            });

            return res
                .status(200)
                .send({ message: "Armazenamento deletado com sucesso." });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Não foi possível remover o armazenamento." });
        }
    }
}
