import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// listagem de todos os produtos -- TABELA PRODUCTS

router.get("/", async (_, res) => {
    const products = await prisma.product.findMany({
        include: {
            colors: true,
            storages: true,
            categories: true,
        },
    });

    res.json(products);
});

// listagem produto específico -- ID ou CATEGORIA
// rota para listagem de produtos onde vai buscar a categoria de produtos desejada, seja ela "/iphone", "/android", "/smartwatch", etc...

router.get("/:param", async (req, res) => {
    const param = req.params.param;
    try {
        const numericParam = Number(param);

        if (!isNaN(numericParam)) {
            const id = Number(param);
            const product = await prisma.product.findUnique({
                where: {
                    id,
                },
            });

            if (!product) {
                return res.status(404).send({ message: "Produto não encontrado" });
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

            res.status(200).send(products);
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
                return res.status(404).send({ message: "Categoria não encontrada" });
            }
            res.status(200).send(products);
        }
    } catch (error) {
        return res.status(500).send({ message: "Falha na consulta de produtos" });
    }
});

// rota para cadastro de novos produtos

router.post("/", async (req, res) => {
    const {
        name,
        price,
        image,
        black_friday,
        discount,
        average_score,
        description,
        created_at,
        color_id,
        storage_id,
        categorie_id,
        quantity,
        ean,
        status,
        purchase_price,
        expiry_date,
    } = req.body;

    try {
        const productWidthSameEAN = await prisma.product.findFirst({
            where: {
                ean: {
                    equals: ean,
                },
            },
        });

        if (productWidthSameEAN) {
            console.log(productWidthSameEAN);

            // return res
            //     .status(409)
            //     .send({ message: "Já existe um produto cadastrado com esse nome" });

            const existentInStock = await prisma.stock.findMany({
                where: {
                    product_id: productWidthSameEAN.id,
                },
            });

            console.log("olá", existentInStock);

            await prisma.stock.update({
                where: {
                    id: existentInStock[0].id,
                },
                data: {
                    quantity: existentInStock[0].quantity + quantity,
                },
            });

            res.send("Quantidade atualizada");
        } else {
            await prisma.product.create({
                data: {
                    name: name,
                    price: price,
                    image: image,
                    black_friday: black_friday,
                    discount: discount,
                    average_score: average_score,
                    description: description,
                    created_at: new Date(created_at),
                    color_id: color_id,
                    storage_id: storage_id,
                    categorie_id: categorie_id,
                    ean: ean,
                },
            });

            const batata = await prisma.product.findFirst({
                where: {
                    ean: {
                        equals: ean,
                    },
                },
            });

            console.log("battinha frita", batata);

            await prisma.stock.create({
                data: {
                    product_id: batata?.id,
                    status: status,
                    purchase_price: purchase_price,
                    expiry_date: new Date(expiry_date),
                    created_at: new Date(created_at),
                    quantity: quantity,
                },
            });
            res.send("Produto cadastrado");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Falha ao cadastrar um produto " });
    }

    res.status(201).send();
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const productExistent = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!productExistent) {
            return res
                .status(400)
                .send({ message: "Produto não existe na base de dados " });
        }

        await prisma.product.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Não foi possível remover o produto" });
    }

    res.status(200).end();
});

// router.put("/:id", async (req, res) => {
//     const id = Number(req.params.id);

// })

// rota para lista dos produtos em estoque  --> no front-end fazer tratamento para mostrar os detalhes dos produtos

export default router;
