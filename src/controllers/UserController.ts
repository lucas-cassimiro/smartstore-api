import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import "./../utils/userUtils";

const prisma = new PrismaClient();

import { Request, Response } from "express";

type userProps = {
  email: string;
  password_hash: string;
  cpf: string;
  cellphone: string;
  first_name: string;
  last_name: string;
  date_birth: string;
};

const UserController = {
    index: async (req: Request, res: Response) => {
        console.log(typeof res);
        console.log(res);
        const allUsers = await prisma.user.findMany({});
        res.json({ allUsers });
    },

    create: async (req: Request, res: Response) => {
        try {
            const { email } = req.body as userProps;

            const user = await prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if (user) {
                return res.status(404).send("usuário já existe");
            } else {
                const newUser = {
                    ...(req.body as userProps),
                    admin_auth: Boolean(false),
                    created_at: new Date(),
                    date_birth: new Date(req.body.date_birth),
                };

                const hash = bcrypt.hashSync(newUser.password_hash, 10);

                newUser.password_hash = hash;

                await prisma.user.create({
                    data: newUser,
                });

                res.send("Objeto criado com sucesso!");
            }
        } catch (error) {
            console.log(error);
        }
    },

    edit: async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const existentUser = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!existentUser) {
            return res.status(404).send({ message: "Usuário não existente!" });
        } else {
            const updateUser = await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    ...req.body,
                },
            });

            console.log(updateUser);
        }
    },
};

export default UserController;
