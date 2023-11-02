import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export default async function findExistentUser(keySearch:any){

    if(isNaN(keySearch)){
        return await prisma.user.findFirst({
                where: {
                    email:{
                        equals: keySearch
                    }
                },
            })
    }else{
        return await prisma.user.findFirst({
            where:{
                id: Number(keySearch)
            }
        })
    } 
}