import express from "express";

import RatingController from "../../controllers/ratingController";

const ratingRoutes = express.Router();

ratingRoutes.get("/", RatingController.index);
ratingRoutes.post("/", RatingController.create);
ratingRoutes.put("/:id", RatingController.edit);

export default ratingRoutes;
