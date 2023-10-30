import express from "express";
import allRoutes from "./routes/index"

const port = 3001;
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(allRoutes)

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor em execucação na porta ${port}`);
});
