// import prisma from "../../config/clientPrisma";

// import { Request, Response } from "express";

// const StockController = {
//     index: async (req: Request, res: Response) => {
//         const products = await prisma.stock.findMany({
//             include: {
//                 products: {
//                     include: {
//                         colors: true,
//                         storages: true,
//                         categories: true,
//                     },
//                 },
//             },
//         });

//         res.json(products);
//     },

//     edit: async (req: Request, res: Response) => {
//         const id = Number(req.params.id);

//         const { status, purchase_price, expiry_date, updated_at, quantity } =
//             req.body;

//         try {
//             const product = await prisma.stock.findUnique({
//                 where: {
//                     id,
//                 },
//             });

//             if (!product) {
//                 return res.status(404).send({ message: "Produto não encontrado" });
//             }

//             await prisma.stock.update({
//                 where: {
//                     id,
//                 },
//                 data: {
//                     status: status,
//                     purchase_price: purchase_price,
//                     expiry_date: new Date(expiry_date),
//                     updated_at: new Date(updated_at),
//                     quantity: quantity,
//                 },
//             });

//             res.status(200).send();
//         } catch (error) {
//             return res
//                 .status(500)
//                 .send({ message: "Falha ao atualizar o estoque do produto" });
//         }
//     },
// };

// export default StockController;
