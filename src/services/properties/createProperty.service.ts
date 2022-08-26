import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import {
  IAddressRequest,
  IPropertyRequest,
} from "../../interfaces/properties/index";

export const createPropertyService = async (
  { value, size, address, categoryId }: IPropertyRequest, isAdm : boolean
) => {

  if(isAdm === false){
    throw new AppError(403, "Must be admin");
  }

  const propertyRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const propertyAlreadyExists = await propertyRepository.findOne({
    where:{
        address: address
    }
  });

  if(propertyAlreadyExists){
    throw new AppError(400, "Property already exists.");
  }

  if (address.state.length > 2){
    throw new AppError(400, "Invalid State");
  }

  if (address.zipCode.length > 8){
    throw new AppError(400, "Invalid ZipCode");
  }

  const category = await categoriesRepository.findOne({
    where:{
        id: categoryId
    }
  });

  if(!category){
    throw new AppError(404, "Invalid Category");
  }

  const newAddress = addressRepository.create(address);
  await addressRepository.save(newAddress);

  const property2 = {
    value,
    size,
    address: newAddress,
    category
  }

  const newProperty = propertyRepository.create(property2)

  await propertyRepository.save(newProperty);

  return newProperty;
};
