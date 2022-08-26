import { Request, Response } from "express";
import { listCategoryByIDService } from "../../services/categories/listCategoryByID.service";

export const listCategoryByIDController = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const categoryProperties = await listCategoryByIDService(id);
    return res.status(200).json(categoryProperties);
}