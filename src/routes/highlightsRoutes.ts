import { Router } from "express";

import { HighlightController } from "../app/controllers/HighlightsController";

const highlightsRoutes = Router();

highlightsRoutes.get("/", new HighlightController().index);
highlightsRoutes.put("/:id", new HighlightController().update);

export default highlightsRoutes;
