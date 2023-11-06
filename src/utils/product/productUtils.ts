import prisma from "../../../config/clientPrisma";


export default async function findByEAN(nameSearch: string) {
    return await prisma.product.findFirst({
        where: {
            ean: {
                equals: nameSearch,
            },
        },
    });
}
