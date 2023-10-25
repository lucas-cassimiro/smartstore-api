import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (_, res) => {
    const products = await prisma.product.findMany({
        include: {
            colors: true,
            storages: true,
            categories: true,
        },
    });

    res.json(products);
});

app.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
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
    } catch (error) {
        return res.status(500).send({ message: "Falha ao filtrar produtos" });
    }
});

app.get("/shop/:categorie", async (req, res) => {
    const categorie = req.params.categorie;
    try {
        const products = await prisma.product.findMany({
            include: {
                colors: true,
                storages: true,
                categories: true,
            },
            where: {
                categories: {
                    name: {
                        equals: categorie,
                        mode: "insensitive",
                    },
                },
            },
        });
        res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ message: "Falha ao buscar os produtos " });
    }
});

app.post("/cadastro", async (req, res) => {
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


app.listen(port, () => {
    console.log(`Servidor em execucação na porta ${port}`);
});
