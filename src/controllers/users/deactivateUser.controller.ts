import {Request, Response} from "express";
import { deactivateUser } from "../../services/users/deactivateUser.service";

export const deactivateUserController = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const isAdm = req.user.isAdm;
    const user = await deactivateUser(id, isAdm);
    return res.status(204).json(user);
}