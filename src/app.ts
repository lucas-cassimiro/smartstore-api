import express from "express";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import routerAddresses from "./routes/addressesRoutes";
import routerUsers from "./routes/userRoutes";
import routerColors from "./routes/colorsRoutes";
import routerCategories from "./routes/categoriesRoutes";
import routerProducts from "./routes/productsRoutes";
import routerStocks from "./routes/stocksRoutes";
import routerRatings from "./routes/ratingsRoutes";
import routerStorages from "./routes/storagesRoutes";
import routerOrderItems from "./routes/orderItemsRoutes";
import routerHighlights from "./routes/highlightsRoutes";
import routerBlackfriday from "./routes/blackfridayRoutes";
//import routerOrders from "./routes/ordersRoutes";

const __dirname = path.resolve();

class App {
    public server: express.Application;
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.server.use("/address", routerAddresses);
        this.server.use("/users", routerUsers);
        this.server.use("/colors", routerColors);
        this.server.use("/categories", routerCategories);
        this.server.use("/products", routerProducts);
        this.server.use("/stocks", routerStocks);
        this.server.use("/ratings", routerRatings);
        this.server.use("/storages", routerStorages);
        this.server.use("/orders", routerOrderItems);
        //this.server.use("/orders", routerOrders);
        this.server.use("/news", routerHighlights);
        this.server.use("/blackfriday", routerBlackfriday);

        this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.server.use(
            "/tmp/uploads",
            express.static(path.join(__dirname, "tmp/uploads"))
        );
    }
}

export default new App().server;
