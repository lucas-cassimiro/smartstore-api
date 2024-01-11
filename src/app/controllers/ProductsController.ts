import prisma from "../../../config/clientPrisma";

import { Request, Response } from "express";

import findByEAN from "../../utils/product/productUtils";
import { ProductData } from "../../interfaces/ProductData";

export class ProductController {
    async index(_req: Request, res: Response) {
        try {
            const products = await prisma.product.findMany({
                include: {
                    categories: true,
                    colors: true,
                    storages: true,
                },
            });

            return res.json(products);
        } catch (error) {
            return res.status(500).send({ message: "Falha ao buscar os produtos." });
        }
    }

    async show(req: Request, res: Response) {
        const param = req.params.param;

        try {
            if (param === "blackfriday") {
                const products = await prisma.product.findMany({
                    include: {
                        colors: true,
                        storages: true,
                        categories: true,
                    },
                    where: {
                        black_friday: true,
                    },
                });

                return res.status(200).send(products);
            }

            const numericParam: number = Number(param);

            if (!isNaN(numericParam)) {
                const id = Number(param);
                const product = await prisma.product.findUnique({
                    where: {
                        id,
                    },
                });

                if (!product) {
                    return res.status(404).send({ message: "Produto não encontrado." });
                }

                const products = await prisma.product.findMany({
                    include: {
                        colors: true,
                        storages: true,
                        categories: true,
                    },
                    where: {
                        id,
                    },
                });

                return res.status(200).send(products);
            } else {
                const products = await prisma.product.findMany({
                    include: {
                        colors: true,
                        storages: true,
                        categories: true,
                    },
                    where: {
                        categories: {
                            name: {
                                equals: param,
                                mode: "insensitive",
                            },
                        },
                    },
                });

                if (products.length === 0) {
                    return res.status(404).send({ message: "Categoria não encontrada." });
                }
                return res.status(200).send(products);
            }
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Falha na consulta de produtos." });
        }
    }

    async create(req: Request, res: Response) {
        const {
            name,
            price,
            black_friday,
            discount,
            average_score,
            description,
            color_id,
            storage_id,
            categorie_id,
            quantity,
            status,
            purchase_price,
            expiry_date,
            ean,
            highlight,
            black_friday_offer,
        } = req.body;

        const isBlackFriday = black_friday === "true";
        const isHighlight = highlight === "true";
        const isBlackFridayOffer = black_friday_offer === "true";

        const storageIdValue = storage_id === "0" ? null : parseInt(storage_id);

        const img = req.file?.filename;

        try {
            const productWithSameEAN = await findByEAN(ean);

            if (productWithSameEAN) {
                const existentInStock = await prisma.stock.findMany({
                    where: {
                        product_id: productWithSameEAN.id,
                    },
                });

                await prisma.stock.update({
                    where: {
                        id: existentInStock[0].id,
                    },
                    data: {
                        quantity: existentInStock[0].quantity + Number(quantity),
                        purchase_price,
                        updated_at: new Date(),
                    },
                });

                return res.status(200).send({
                    message:
            "Produto já existente na base de dados. Quantidade atualizada.",
                });
            } else {
                const createdProductandStock = await prisma.$transaction(
                    async (prisma) => {
                        const createdProduct = await prisma.product.create({
                            data: {
                                name,
                                price: Number(price),
                                black_friday: isBlackFriday,
                                image: img,
                                discount: Number(discount),
                                average_score,
                                description,
                                color_id: Number(color_id),
                                storage_id: storageIdValue,
                                categorie_id: Number(categorie_id),
                                ean,
                                highlight: isHighlight,
                                black_friday_offer: isBlackFridayOffer,
                            },
                        });

                        const product_id: number = createdProduct.id;

                        const createdStock = await prisma.stock.create({
                            data: {
                                product_id,
                                status,
                                purchase_price,
                                expiry_date:
                  expiry_date !== null ? new Date(expiry_date) : null,
                                created_at: new Date(),
                                updated_at: new Date(),
                                quantity: Number(quantity),
                            },
                        });

                        return { createdProduct, createdStock };
                    }
                );

                if (createdProductandStock) {
                    return res.status(201).send({ message: "Novo produto cadastrado." });
                } else {
                    return res
                        .status(500)
                        .send({ error: "Falha ao criar o produto ou o estoque." });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Falha ao cadastrar produto." });
        }
    }

    async destroy(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        try {
            const productExistent = await prisma.product.findUnique({
                where: {
                    id,
                },
            });

            if (!productExistent) {
                return res
                    .status(400)
                    .send({ message: "Produto não consta na base de dados." });
            }

            const product_id: number = productExistent.id;

            const deleteProductInStock = prisma.stock.deleteMany({
                where: {
                    product_id,
                },
            });

            const deleteProductInProduct = prisma.product.delete({
                where: {
                    id: product_id,
                },
            });

            const deletedFromStockAndProduct = await prisma.$transaction([
                deleteProductInStock,
                deleteProductInProduct,
            ]);

            if (deletedFromStockAndProduct) {
                return res
                    .status(200)
                    .send({ message: "Produto deletado com sucesso." });
            } else {
                return res.status(404).send({ message: "Falha ao deletar produto." });
            }
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Não foi possível remover o produto." });
        }
    }

    async update(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        const updatedFields = req.body as Partial<ProductData>;

        const productExistentInDatabase = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!productExistentInDatabase) {
            return res
                .status(404)
                .send({ message: "Produto não existe na base de dados." });
        }

        try {
            await prisma.product.update({
                where: {
                    id,
                },
                data: {
                    ...updatedFields,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(404).send({ message: "Erro ao atualizar produto." });
        }

        return res
            .status(200)
            .send({ message: "Produto alterado na base de dados." });
    }
}
