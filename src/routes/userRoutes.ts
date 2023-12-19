import { Router } from "express";
import { UserController } from "../app/controllers/UsersController";
import { authMiddleware } from "../middlewares/auth";

const usersRoutes = Router();

usersRoutes.get("/", new UserController().index);
usersRoutes.get("/profile", authMiddleware, new UserController().getProfile);
usersRoutes.post("/", new UserController().create);
usersRoutes.post("/login", new UserController().login);
usersRoutes.put("/:id", new UserController().update);

export default usersRoutes;
