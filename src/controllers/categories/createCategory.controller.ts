import { Request, Response } from "express";
import { createCategoryService } from "../../services/categories/createCategory.service";

export const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const isAdm = req.user.isAdm;
  const category = await createCategoryService({ name }, isAdm);
  return res.status(201).json(category);
};
