import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

export const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization;

    if(!token){
        throw new AppError(401, "Missing authorization token");
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (error: any, decoded: any) =>{

        if(error){
            throw new AppError(403, "Invalid Token");
        }

        // if(!decoded.isAdm){
        //     throw new AppError(403, "Needs admin permission!");
        // }

        req.user ={
            isAdm: decoded.isAdm,
            id: decoded.sub
        }

        next();

    })

}