import prisma from "../../config/db";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import { Request, Response } from "express";
import "../utils/user/userUtils";
import findExistentItem from "../utils/index/indexUtils";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


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
        const allUsers = await prisma.user.findMany({});
        res.json({ allUsers });
    },

    create: async (req: Request, res: Response) => {
        try {
            const { email } = req.body as userProps;

            const user = await findExistentItem(email);

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

                return res.status(201).send("Usuário criado com sucesso!");
            }
        } catch (error) {
            return res.status(500).send({ message: "Erro ao cadastrar usuário" });
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            const existentUser = findExistentItem(id);

            if (!existentUser) {
                return res.status(404).send({ message: "Usuário não existente!" });
            } else {
                await prisma.user.update({
                    where: {
                        id,
                    },
                    data: {
                        ...req.body,
                    },
                });

                return res.status(201).send({ message: "Usuário existente." });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Erro ao editar usuário." });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const findUser = await findExistentItem(email);

            if(findUser){
                let user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (user && bcrypt.compareSync(password, user.password_hash)) {
                    const token = jsonwebtoken.sign(
                        {
                            exp: Math.floor(Date.now() / 1000) + 60 * 60,
                            data: { id: user.id, email: user.email, admin: user.admin_auth },
                        },
                        "segredo123"
                    );

                    return res.status(200).json({ token });
                } else {
                    return res.status(500).json({ error: "Usuário ou senha incorretos." });
                }
            }


        } catch (error) {
            return res.status(500).send({ message: "Erro ao fazer login." });
        }
    },
};

export default UserController;
