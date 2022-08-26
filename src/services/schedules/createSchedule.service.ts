import { instanceToPlain } from "class-transformer";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import {IScheduleRequest} from "../../interfaces/schedules/index";

export const createScheduleService = async ({date, hour, propertyId, userId} : IScheduleRequest ) =>{
    
    const getDate = new Date(date).getDay();
    if(getDate === 0 || getDate === 6){
        throw new AppError(400, "Schedules can't be on weekends");
    }

    const getHour = parseFloat(hour.split(":")[0]);
    if(getHour < 8 || getHour > 18){
        throw new AppError(400, "Schedules can only be set between 08:00 and 18:00")
    }

    const scheduleRepository = AppDataSource.getRepository(Schedules);
    const propertyRepository = AppDataSource.getRepository(Properties);
    const userRepository = AppDataSource.getRepository(Users);

    const property = await propertyRepository.findOne({where: {id: propertyId}});
    if(!property){
        throw new AppError(404, "Invalid Property");
    }

    const user = await userRepository.findOne({where: {id: userId}});
    if(!user){
        throw new AppError(404, "Invalid User");
    }

    const scheduleAlreadyExists = await scheduleRepository.findOne({where: {date: date, hour: hour} });
    if(scheduleAlreadyExists){
        throw new AppError(400, "Schedule already exists");
    }


    const newSchedule = await scheduleRepository.save({
        date: date,
        hour: hour,
        user: instanceToPlain(user),
        property: property 
    })
    

    return newSchedule;

}