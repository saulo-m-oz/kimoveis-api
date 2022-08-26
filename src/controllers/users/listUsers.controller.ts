import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express"
import { listUsers } from "../../services/users/listUsers.service"

export const listUsersController = async (req: Request, res: Response) =>{
    const isAdm = req.user.isAdm;
    const users = await listUsers(isAdm);
    return res.json(instanceToPlain(users));
}