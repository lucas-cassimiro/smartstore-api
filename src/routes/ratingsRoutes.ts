import { Router } from "express";

import { RatingController } from "../app/controllers/RatingsController";

const ratingsRoutes = Router();

ratingsRoutes.get("/", new RatingController().index);
// fazer rota para buscar a avaliação específica daquele produto
ratingsRoutes.post("/", new RatingController().create);

export default ratingsRoutes;
