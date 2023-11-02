import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const UserController = {
    index: async (_, res) => {
        const allUsers = await prisma.user.findMany({});
        res.json({ allUsers });
    },

    create: async (req, res) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: req.body.email,
                },
            });

            if (!user) {
                const newUser = {
                    ...req.body,
                    admin_auth: Boolean(true),
                    created_at: new Date(),
                };

                const hash = bcrypt.hashSync(newUser.password_hash, 10);

                newUser.password_hash = hash;

                await prisma.user.create({
                    data: newUser,
                });

                res.send("Objeto criado com sucesso!");
            } else {
                res.send("usuário já existe");
            }
        } catch (error) {
            console.log(error);
        }
    },

    edit: (req: any, res: any) => {
        console.log(req.body);
        console.log(req.files);
    },
};

export default UserController;
