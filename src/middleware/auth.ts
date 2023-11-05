
import { NextFunction, Request, Response } from "express";
import jsonWebToken from "jsonwebtoken";

const auth = (req:Request, res:Response, next:NextFunction) => {

    if(req.headers.authorization){
        try {
            jsonWebToken.verify(req.headers.authorization, 'segredo123')
            next()
        } catch (error) {
            res.status(401).json({ error })
        }
        
    } else res.status(401).json({ error: "Usuário não autenticado!" })

}

export default auth