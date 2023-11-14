import prisma from "../../config/clientPrisma";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import "../utils/user/userUtils";
import findExistentItem from "../utils/index/findExistentItem";

export type userProps = {
  id: number;
  email: string;
  password_hash: string;
  cpf: string | null;
  cellphone: string | null;
  first_name: string | null;
  last_name: string | null;
  date_birth: Date | null;
  created_at: Date | null;
  last_login: Date | null;
  admin_auth: boolean | null;
};

const UserController = {
    index: async (req: Request, res: Response) => {
        const allUsers = await prisma.user.findMany({});
        res.json({ allUsers });
    },

    create: async (req: Request, res: Response) => {
        try {
            const { email } = req.body as userProps;

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            // await findExistentItem("user", email);

            if (user) {
                return res.status(404).json({ message: "Email já cadastrado." });
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

                return res.status(201).json({ message: "Usuário criado com sucesso!" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Erro ao cadastrar usuário" });
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            const existentUser = await findExistentItem("user", id);

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
            return res.status(500).send({ message: "Erro ao editar usuário." });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password_hash } = req.body;

            // const findUser = await findExistentItem("user", email);

            const findUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!findUser)
                return res.status(400).send({ message: "E-mail ou senha inválidos." });

            const verifyPass = await bcrypt.compare(
                password_hash,
                findUser.password_hash
            );

            console.log("verifyPass:", verifyPass);

            if (!verifyPass) {
                return res.status(400).send({ message: "E-mail ou senha inválidos." });
            }

            const token = jwt.sign({ data: findUser }, process.env.JWT_PASS ?? "", {
                expiresIn: "8h",
            });

            console.log(token);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password_hash: _, ...userLogin } = findUser;

            return res.status(200).json({
                user: userLogin,
                token: token,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Erro ao fazer login." });
        }
    },
    profile: async (req: Request, res: Response) => {
        return res.json(req.user);
    },
};

export default UserController;
