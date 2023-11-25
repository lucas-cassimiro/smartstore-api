import express from "express";

import { Request, Response, NextFunction } from "express";

import"dotenv/config";

import routerUser from "./src/routes/users";
import routerProducts from "./src/routes/products";
import routerStock from "./src/routes/stocks";
import routerColors from "./src/routes/colors";
import routerStorages from "./src/routes/storages";
import routerRatings from "./src/routes/ratings";
import routerOrderItems from "./src/routes/orderItems";
import routerAddress from "./src/routes/addresses";
import routerCategories from "./src/routes/categories";
//import routerOrders from "./routes/orders";

const port = 3001;
const app = express();

app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", routerUser);
app.use("/produto", routerProducts);
app.use("/estoque", routerStock);
app.use("/cor", routerColors);
app.use("/armazenamento", routerStorages);
app.use("/ratings", routerRatings);
app.use("/pedidos", routerOrderItems);
app.use("/endereco", routerAddress);
app.use("/categoria", routerCategories);

//app.use("/pedidosorder", routerOrders);

app.listen(port, () => {
    console.log(`Servidor em execucação na porta ${port}`);
});
