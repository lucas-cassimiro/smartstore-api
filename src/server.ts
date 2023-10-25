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


app.listen(port, () => {
    console.log(`Servidor em execucação na porta ${port}`);
});
