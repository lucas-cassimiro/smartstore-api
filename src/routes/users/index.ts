import UserController from "../../controllers/UserController";
import express from "express";
import upload from "../../middleware/upload";
import auth from "./../../middleware/auth"

const userRoutes = express.Router();

userRoutes.get("/", UserController.index);

userRoutes.post("/", UserController.create);

userRoutes.post("/login", UserController.login)

userRoutes.put("/:id", upload.any(), UserController.edit);

export default userRoutes;
