import UserController from "../../controllers/UserController";
import express from 'express'
import upload from "../../middleware/upload";

const userRoutes = express.Router()

userRoutes.get("/", UserController.index);

userRoutes.post('/', UserController.create)

userRoutes.put('/:id', upload.any(), UserController.edit)

export default userRoutes;
