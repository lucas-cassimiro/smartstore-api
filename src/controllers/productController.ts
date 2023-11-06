// import prisma from "../../config/clientPrisma";

// import { Request, Response } from "express";

// import findByEAN from "../utils/product/productUtils";

// const productController = {
//     index: async (req: Request, res: Response) => {
//         const allProducts = await prisma.product.findMany({});

//         res.json(allProducts);
//     },

//     indexParam: async (req: Request, res: Response) => {
//         const param = req.params.param;
//         try {
//             const numericParam = Number(param);

//             if (!isNaN(numericParam)) {
//                 const id = Number(param);
//                 const product = await prisma.product.findUnique({
//                     where: {
//                         id,
//                     },
//                 });

//                 if (!product) {
//                     return res.status(404).send({ message: "Produto não encontrado" });
//                 }

//                 const products = await prisma.product.findMany({
//                     include: {
//                         colors: true,
//                         storages: true,
//                         categories: true,
//                     },
//                     where: {
//                         id,
//                     },
//                 });

//                 res.status(200).send(products);
//             } else {
//                 const products = await prisma.product.findMany({
//                     include: {
//                         colors: true,
//                         storages: true,
//                         categories: true,
//                     },
//                     where: {
//                         categories: {
//                             name: {
//                                 equals: param,
//                                 mode: "insensitive",
//                             },
//                         },
//                     },
//                 });

//                 if (products.length === 0) {
//                     return res.status(404).send({ message: "Categoria não encontrada" });
//                 }
//                 res.status(200).send(products);
//             }
//         } catch (error) {
//             return res.status(500).send({ message: "Falha na consulta de produtos" });
//         }
//     },

//     create: async (req: Request, res: Response) => {
//         const {
//             name,
//             price,
//             image,
//             black_friday,
//             discount,
//             average_score,
//             description,
//             created_at,
//             color_id,
//             storage_id,
//             categorie_id,
//             quantity,
//             status,
//             purchase_price,
//             expiry_date,
//             ean,
//         } = req.body;

//         try {
//             const productWithSameEAN = await findByEAN(ean);

//             if (productWithSameEAN) {
//                 const existentInStock = await prisma.stock.findMany({
//                     where: {
//                         product_id: productWithSameEAN.id,
//                     },
//                 });

//                 await prisma.stock.update({
//                     where: {
//                         id: existentInStock[0].id,
//                     },
//                     data: {
//                         quantity: existentInStock[0].quantity + quantity,
//                         purchase_price,
//                         updated_at: new Date(created_at),
//                     },
//                 });

//                 return res.status(200).send({
//                     message:
//                         "Produto já existente na base de dados. Quantidade atualizada.",
//                 });
//             } else {
//                 const createdProductandStock = await prisma.$transaction(
//                     async (prisma) => {
//                         const createdProduct = await prisma.product.create({
//                             data: {
//                                 name,
//                                 price,
//                                 image,
//                                 black_friday,
//                                 discount,
//                                 average_score,
//                                 description,
//                                 color_id,
//                                 storage_id,
//                                 categorie_id,
//                                 ean,
//                             },
//                         });

//                         const product_id = createdProduct.id;
//                         const createdStock = await prisma.stock.create({
//                             data: {
//                                 product_id,
//                                 status,
//                                 purchase_price,
//                                 expiry_date: new Date(expiry_date),
//                                 created_at: new Date(created_at),
//                                 updated_at: new Date(created_at),
//                                 quantity,
//                             },
//                         });

//                         return { createdProduct, createdStock };
//                     }
//                 );

//                 if (createdProductandStock) {
//                     return res.status(201).send({ message: "Novo produto cadastrado" });
//                 } else {
//                     return res
//                         .status(500)
//                         .send({ error: "Falha ao criar o produto ou o estoque" });
//                 }
//             }
//         } catch (error) {
//             return res.status(500).send({ message: "Falha ao cadastrar produto" });
//         }
//     },

//     delete: async (req: Request, res: Response) => {
//         const id = Number(req.params.id);
//         try {
//             const productExistent = await prisma.product.findUnique({
//                 where: {
//                     id,
//                 },
//             });

//             if (!productExistent) {
//                 return res
//                     .status(400)
//                     .send({ message: "Produto não consta na base de dados " });
//             }

//             const product_id = productExistent.id;

//             const deleteProductInStock = prisma.stock.deleteMany({
//                 where: {
//                     product_id,
//                 },
//             });

//             const deleteProductInProduct = prisma.product.delete({
//                 where: {
//                     id: product_id,
//                 },
//             });

//             const deletedFromStockAndProduct = await prisma.$transaction([
//                 deleteProductInStock,
//                 deleteProductInProduct,
//             ]);

//             if (deletedFromStockAndProduct) {
//                 return res
//                     .status(200)
//                     .send({ message: "Produto deletado com sucesso" });
//             } else {
//                 return res.status(404).send({ message: "Falha ao deletar produto" });
//             }
//         } catch (error) {
//             return res
//                 .status(500)
//                 .send({ message: "Não foi possível remover o produto" });
//         }

//         res.status(200).send();
//     },

//     edit: async (req: Request, res: Response) => {
//         const id = Number(req.params.id);

//         const {
//             name,
//             price,
//             image,
//             black_friday,
//             discount,
//             description,
//             color_id,
//             storage_id,
//             categorie_id,
//             ean,
//         } = req.body;

//         const productExistentInDatabase = await prisma.product.findUnique({
//             where: {
//                 id,
//             },
//         });

//         if (!productExistentInDatabase) {
//             return res
//                 .status(404)
//                 .send({ message: "Produto não existe na base de dados" });
//         }

//         try {
//             await prisma.product.update({
//                 where: {
//                     id,
//                 },
//                 data: {
//                     name,
//                     price,
//                     image,
//                     black_friday,
//                     discount,
//                     description,
//                     color_id,
//                     storage_id,
//                     categorie_id,
//                     ean,
//                 },
//             });
//         } catch (error) {
//             return res.status(404).send({ message: "Erro ao atualizar produto" });
//         }

//         res.status(200).send({ message: "Produto alterado na base de dados " });
//     },
// };

// export default productController;
