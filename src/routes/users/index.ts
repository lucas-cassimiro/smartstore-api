import userController from "../../controllers/UserController";
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", userController.index);
userRoutes.post("/", userController.create);
userRoutes.post("/login", userController.login);
userRoutes.get("/profile", authMiddleware, userController.profile);
userRoutes.put("/:id", userController.edit);

export default userRoutes;
