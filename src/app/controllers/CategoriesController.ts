import { Request, Response } from "express";

import prisma from "../../../config/clientPrisma";

//import findExistentItem from "../utils/index/findExistentItem";

export class CategorieController {
    async index(req: Request, res: Response) {
        const categories = await prisma.categorie.findMany({});
        res.json(categories);
    }

    async create(req: Request, res: Response) {
        const { name } = req.body;
        try {
            const categorieExistentInDatabase = await prisma.categorie.findUnique({
                where: {
                    name,
                },
            });

            if (categorieExistentInDatabase) {
                return res
                    .status(404)
                    .send({
                        message: "Categoria de produtos já existe na base de dados",
                    });
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
    }

    async update(req: Request, res: Response) {
        const { name } = req.body;
        const { id } = req.body;

        try {
            const categorieExistentInDatabase = await prisma.categorie.findUnique({
                where: {
                    id,
                },
            });

            if (!categorieExistentInDatabase) {
                return res
                    .status(400)
                    .send({
                        message: "Categoria de produto não consta na base de dados ",
                    });
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
                .send({
                    message: "Falha ao cadastrar nova categoria na base de dados",
                });
        }

        return res
            .status(200)
            .send({ message: "Categoria de produto alterada na base de dados " });
    }
}
