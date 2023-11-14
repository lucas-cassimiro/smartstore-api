import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import prisma from "../../config/clientPrisma";

// type JwtPayload = {
//   email: string;
// };

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers;

        console.log("autorização:", authorization);

        if (!authorization) {
            return res.status(401).send({ message: "Não autorizado" });
        }

        const token = authorization.split(" ")[1];

        console.log(token);

        const { id } = (
      jwt.verify(token, process.env.JWT_PASS ?? "") as {
        data: { id: number };
      }
        ).data;

        const findUser = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!findUser) {
            return res.status(401).send({ message: "Não autorizado." });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password_hash: _, ...loggedUser } = findUser;

        req.user = loggedUser;

        console.log("loggedUser:", loggedUser);
        console.log("reqUser:", req.user);

        next();
    } catch (error) {
        console.log("Erro ao decodificar o token:", error);
        return res.status(500).send({ message: "Não autorizado." });
    }
};
