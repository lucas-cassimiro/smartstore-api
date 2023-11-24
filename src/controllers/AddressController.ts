import { Request, Response } from "express";

import prisma from "../../config/clientPrisma";

type AddressType = {
  user_id: number;
  street_address: string;
  number_address: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  recipient: string;
};

export class AddressController {
    async getAddress(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

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
        } = req.body as AddressType;

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