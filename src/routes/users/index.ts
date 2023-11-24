import express from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { UserController } from "../../controllers/UserController";

const userRoutes = express.Router();

userRoutes.get("/", new UserController().getUsers);
userRoutes.get("/profile", authMiddleware, new UserController().profile);
userRoutes.post("/", new UserController().create);
userRoutes.post("/login", new UserController().login);
userRoutes.put("/:id", new UserController().edit);

export default userRoutes;
