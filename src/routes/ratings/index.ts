import express from "express";

import { RatingController } from "../../controllers/RatingController";

const ratingRoutes = express.Router();

ratingRoutes.get("/", new RatingController().getRating);
ratingRoutes.post("/", new RatingController().create);

// ratingRoutes.put("/:id", RatingController.edit);

export default ratingRoutes;
