import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3001;
const app = express();
const prisma = new PrismaClient();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());

// listagem de todos os produtos -- TABELA PRODUCTS

app.get("/products", async (_, res) => {
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

app.get("/products/:param", async (req, res) => {
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

app.post("/products", async (req, res) => {
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
    } = req.body;

    try {
        const productWidthSameName = await prisma.product.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        });

        if (productWidthSameName) {
            return res
                .status(409)
                .send({ message: "Já existe um produto cadastrado com esse nome" });
        }

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
            },
        });
    } catch (error) {
        return res.status(500).send({ message: "Falha ao cadastrar um produto " });
    }

    res.status(201).send();
});

// rota para lista dos produtos em estoque  --> no front-end fazer tratamento para mostrar os detalhes dos produtos

app.get("/estoque", async (_, res) => {
    const products = await prisma.stock.findMany({
        include: {
            products: {
                include: {
                    colors: true,
                    storages: true,
                    categories: true,
                },
            },
        },
    });

    res.json(products);
});

// rota para cadastrar novas quantidades de estoque do produto específico que chegou na loja
// no front-end vamos mostrar a tabela STOCKS, pois os IDS de PRODUCTS e STOCKS são iguais (rota de cima).
// iremos mostrar também os nomes dos produtos, com seus respectivos ID's para conseguir mostrar a quantidade de cada um no estoque

app.put("/estoque/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { status, purchase_price, expiry_date, updated_at, quantity } =
    req.body;

    try {
        const product = await prisma.stock.findUnique({
            where: {
                id,
            },
        });

        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado" });
        }

        await prisma.stock.update({
            where: {
                id,
            },
            data: {
                status: status,
                purchase_price: purchase_price,
                expiry_date: new Date(expiry_date),
                updated_at: new Date(updated_at),
                quantity: quantity,
            },
        });

        res.status(200).send();
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Falha ao atualizar o estoque do produto" });
    }
});

app.listen(port, () => {
    console.log(`Servidor em execucação na porta ${port}`);
});
