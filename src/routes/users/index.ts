import userController from "../../controllers/UserController";
import express from "express";
import upload from "../../middleware/upload";
import auth from "./../../middleware/auth";

const userRoutes = express.Router();

userRoutes.get("/", userController.index);
userRoutes.post("/", userController.create);
userRoutes.post("/login", userController.login);
userRoutes.put("/:id", upload.any(), userController.edit);

export default userRoutes;
