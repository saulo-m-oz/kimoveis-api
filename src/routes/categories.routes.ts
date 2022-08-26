import { Router } from "express";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { listAllCategoriesController } from "../controllers/categories/listAllCategories.controller";
import { listCategoryByIDController } from "../controllers/categories/listCategoryByID.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

export const categoriesRouter = Router();

categoriesRouter.post("", ensureAuthMiddleware,createCategoryController);
categoriesRouter.get("", listAllCategoriesController);
categoriesRouter.get("/:id/properties", listCategoryByIDController);