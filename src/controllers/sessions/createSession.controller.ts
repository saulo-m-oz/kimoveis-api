import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import { createSession } from "../../services/sessions/createSession.service";

export const createSessionController = async (req: Request, res: Response) =>{
    const {email, password} : IUserLogin = req.body;
    const token = await createSession({email, password});
    return res.json({token});
}