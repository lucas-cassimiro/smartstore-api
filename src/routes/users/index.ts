import express from "express";
const userRoutes = express.Router();

userRoutes.get("/users", (req, res) => {
    res.send("pagina users");
});

export default userRoutes;
