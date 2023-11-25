import prisma from "../../../config/clientPrisma";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import "../../utils/user/userUtils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
//import findExistentItem from "../utils/index/findExistentItem";

export type userProps = {
  email: string;
  password_hash: string;
  cpf: string;
  cellphone: string;
  first_name: string;
  last_name: string;
  date_birth: Date | string;
};

export class UserController {
    async index(req: Request, res: Response) {
        const users = await prisma.user.findMany({});
        res.json(users);
    }

    async create(req: Request, res: Response) {
        try {
            const {
                email,
                password_hash,
                cpf,
                cellphone,
                first_name,
                last_name,
                date_birth,
            } = req.body as userProps;

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            // await findExistentItem("user", email);

            if (user) {
                return res.status(404).json({ message: "Email já cadastrado." });
            }
            const newUser = {
                email,
                password_hash,
                cpf,
                cellphone,
                first_name,
                last_name,
                date_birth: new Date(date_birth),
                admin_auth: Boolean(false),
                created_at: new Date(),
                last_login: new Date(),
            };

            const hash = bcrypt.hashSync(newUser.password_hash, 10);

            newUser.password_hash = hash;

            await prisma.user.create({
                data: newUser,
            });

            return res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error("Prisma Error:", {
                    code: error.code,
                    clientVersion: error.clientVersion,
                    meta: error.meta,
                });
            } else {
                console.error("Erro desconhecido:", error);
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const { password_hash, newPassword, date_birth, cellphone } = req.body;

            const findUser = await prisma.user.findUnique({
                where: {
                    id,
                },
            });

            if (!findUser) {
                return res
                    .status(404)
                    .send({ message: "Usuário não existente na base de dados!" });
            }

            const verifyPass = await bcrypt.compare(
                password_hash,
                findUser.password_hash
            );

            if (!verifyPass) {
                return res.status(400).send({ message: "Senha atual inválida." });
            }

            const hash = bcrypt.hashSync(newPassword, 10);

            findUser.password_hash = hash;

            await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    password_hash: findUser.password_hash,
                    date_birth: new Date(date_birth),
                    cellphone,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Erro ao editar usuário." });
        }

        return res.status(201).send({ message: "Dados alterados." });
    }

    async login(req: Request, res: Response) {
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
    }
    async getProfile(req: Request, res: Response) {
        return res.json(req.user);
    }
}
