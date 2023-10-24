import express from "express";

const port = 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("Olá mundo!");
});

app.listen(port, () => {
    console.log(`Servidor em execucação na porta ${port}`);
});
