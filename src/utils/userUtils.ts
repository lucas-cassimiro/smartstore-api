import { PrismaClient } from "@prisma/client";
import identifyEmail from "./indexUtils";
const prisma = new PrismaClient();

export default async function findExistentUser(keySearch: any) {
    if (isNaN(keySearch)) {
        return await prisma.user.findFirst({
            where: {
                email: {
                    equals: keySearch,
                },
            },
        });
    } else {
        return await prisma.user.findFirst({
            where: {
                id: Number(keySearch),
            },
        });
    }
}
