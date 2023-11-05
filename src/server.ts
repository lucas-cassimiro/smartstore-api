import express from "express";
import routerProducts from "./routes/products";
import routerUser from "./routes/users";
import routerStock from "./routes/stock";
import routerColors from "./routes/colors";
import routerStorages from "./routes/storages";
import routerOrders from "./routes/orders";
import routerRatings from "./routes/ratings";
import routerCategories from "./routes/categories";

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

app.use(express.json());

app.use("/products", routerProducts);
app.use("/users", routerUser);
app.use("/stock", routerStock);
app.use("/colors", routerColors);
app.use("/storages", routerStorages);
app.use("/categories", routerCategories);
app.use("/orders", routerOrders);
app.use("/ratings", routerRatings);
// app.use("/order_items", routerOrderItems);

app.listen(port, () => {
    console.log(`Servidor em execucação na porta ${port}`);
});
