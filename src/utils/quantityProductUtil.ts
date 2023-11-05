import { PrismaClient } from "@prisma/client";
import identifyEmail from "./indexUtils";
const prisma = new PrismaClient();

export default async function deleteQuantityProduct(array:any){

    for(const item of array){

        const findProductStock = await prisma.stock.findUnique({
            where:{
                product_id: item.product_id
            }
        })


        const editProductStock = await prisma.stock.update({
            where:{
                product_id: item.product_id
            },
            data:{
                quantity: Number(findProductStock?.quantity) - Number(item.quantity) 
            }
        })
        if(editProductStock){
        if(editProductStock.quantity! <= 0){
            await prisma.stock.update({
                where:{
                    product_id: item.product_id
                },
                data:{
                    status: 'Indisponível'
                }
            })
        }
    }
    }

}