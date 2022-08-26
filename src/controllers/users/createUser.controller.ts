import { instanceToPlain } from "class-transformer";
import {Request, Response} from "express";
import { IUserRequest } from "../../interfaces/users";
import { createUserService } from "../../services/users/createUser.service";

export const createUserController = async (req: Request, res: Response) =>{
    const {name, email, password, isAdm} : IUserRequest = req.body;
    const user = await createUserService({name, email, password, isAdm});
    return res.status(201).json( instanceToPlain(user));
}