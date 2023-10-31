import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function findByEAN(nameSearch:string){
    
    console.log('chegou na function')
    return await prisma.product.findFirst({
        where: {
            ean: {
                equals:nameSearch,
            },
        },
    });
    

}

