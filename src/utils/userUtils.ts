import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// type findExistentUserProps = {
//   keySearch: string | number;
// };

export default async function findExistentUser(keySearch: string | number) {
    // const key = keySearch;

    // const keyUser = Number(key);

    // if (!isNaN(keyUser)) {
    //     const id = Number(key);

    //     const user = await prisma.user.findUnique({
    //         where: {
    //             id,
    //         },
    //     });

    //     if (user) {
    //         return "Usuário não existe na base de dados!";
    //     }
    // }else {
    //     await prisma.user.findUnique({
    //         where: {
    //             email: {
    //                 equals: key
    //             }
    //         }
    //     });
    // }
}
