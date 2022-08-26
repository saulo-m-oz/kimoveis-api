import { instanceToPlain } from "class-transformer";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

export const listScheduleService = async (id : string, isAdm : boolean) =>{

    if(isAdm === false){
        throw new AppError(403, "Must be admin");
    }

    const scheduleRepo = AppDataSource.getRepository(Schedules);
    const propertiesRepo = AppDataSource.getRepository(Properties);

    const propertyToFind = await propertiesRepo.findOne({where: {id}, relations: {schedules: true} });
    if(!propertyToFind){
        throw new AppError(404, "Property not found");
    }

    // const scheduleProperty = instanceToPlain(await scheduleRepo.find({relations: {user: true, property: true}})); 


    return propertyToFind;

}