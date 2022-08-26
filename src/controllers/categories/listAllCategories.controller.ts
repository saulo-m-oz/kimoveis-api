import { Request, Response } from "express";
import { listAllCategories } from "../../services/categories/listAllCategories.service";

export const listAllCategoriesController = async (req: Request, res: Response) =>{
    const categories = await listAllCategories();
    return res.json(categories);
}