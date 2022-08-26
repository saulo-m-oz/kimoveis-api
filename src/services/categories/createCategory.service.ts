import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

export const createCategoryService = async (
  { name }: ICategoryRequest,
  isAdm: boolean
) => {
  if (name.length === 0) {
    throw new AppError(400, "Category name can't be empty.");
  }

  if (isAdm === false) {
    throw new AppError(403, "Must be admin to create a new category!");
  }

  const categoriesRepository = AppDataSource.getRepository(Categories);
  const categoryAlreadyExists = await categoriesRepository.findOne({
    where: { name: name },
  });

  if (categoryAlreadyExists) {
    throw new AppError(400, "Category already exists");
  }

  const newCategory = categoriesRepository.create({
    name,
    properties: [],
  });

  await categoriesRepository.save(newCategory);

  return newCategory;
};
