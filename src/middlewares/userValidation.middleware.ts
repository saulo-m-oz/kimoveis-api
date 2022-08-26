import {Request, Response, NextFunction} from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors/appError";

export const userValidation = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const data = req.body;
        const validatedData = await schema.validate(data);
        req.body = validatedData;
        next();
    } catch (error) {
        throw new AppError(400, "Missing data")
    }
}