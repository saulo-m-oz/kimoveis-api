import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Properties } from "../../entities/properties.entity";

export const listAllPropertiesService = async () =>{
    const propertyRepo = AppDataSource.getRepository(Properties);
    const properties = await propertyRepo.find({relations: {
        address: true
    }});
    return properties;
}