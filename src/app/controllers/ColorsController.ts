import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";
import { ColorData } from "../../interfaces/ColorData";

export class ColorController {
    async index(_req: Request, res: Response) {
        const colors = await prisma.color.findMany();
        return res.json(colors);
    }

    async create(req: Request, res: Response) {
        const { name } = req.body as ColorData;

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
            console.log(error);
            return res.status(404).send({ message: "Falha ao cadastrar nova cor " });
        }

        return res.status(200).send({ message: "Nova cor cadastrada na base de dados " });
    }

    async update(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const { name } = req.body as ColorData;

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
            console.log(error);
            return res.status(404).send({ message: "Falha ao cadastrar nova cor" });
        }

        return res.status(200).send({ message: "Cor alterada na base de dados " });
    }
}
