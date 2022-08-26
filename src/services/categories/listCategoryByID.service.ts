import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

export const listCategoryByIDService = async (category_id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const category = await categoriesRepository.findOne({ where: {id: category_id}, relations: { properties: true} });

  if (category === null) {
    throw new AppError(404, "Invalid category");
  }

  return category;
};
