import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function identifyEmail(find: string) {
    let toggleEmail;

    const includeAva = find.includes("@");
    if (includeAva) {
        toggleEmail = true;
    }

    return toggleEmail ? true : false;
}

async function  findExistentItem (keySearch: any) {
    const valueType = typeof keySearch == "string";

    if (valueType) {
        const identify = await identifyEmail(keySearch);

        if (identify) {
            return await prisma.user.findFirst({
                where: {
                    email: {
                        equals: keySearch,
                    },
                },
            });
        }
    } else {
        return await prisma.user.findFirst({
            where: {
                id: Number(keySearch),
            },
        });
    }
}

export default findExistentItem