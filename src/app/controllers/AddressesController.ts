import { Request, Response } from "express";

import prisma from "../../../config/clientPrisma";

import { AddressData } from "../../interfaces/AddressData";

export class AddressController {
    async show(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);

            const findUser = await prisma.user.findUnique({
                where: {
                    id,
                },
            });

            if (!findUser) {
                return res
                    .status(404)
                    .send({ message: "Usuário não existe na base de dados." });
            }

            const address = await prisma.address.findMany({
                where: {
                    user_id: id,
                },
            });

            return res.json(address);
            
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send({ message: "Não foi possível buscar o endereço." });
        }
    }

    async create(req: Request, res: Response) {
        const {
            user_id,
            street_address,
            number_address,
            complement,
            neighborhood,
            city,
            state,
            recipient,
        } = req.body as AddressData;

        try {
            await prisma.address.create({
                data: {
                    user_id,
                    street_address,
                    number_address: Number(number_address),
                    complement,
                    neighborhood,
                    city,
                    state,
                    recipient,
                },
            });

            return res
                .status(201)
                .send({ message: "Novo endereço cadastrado na base de dados." });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Não foi possível cadastrar um novo endereço." });
        }
    }

    // async update(req: Request, res: Response) {

    // }
}
