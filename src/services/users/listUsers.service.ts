import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

export const listUsers = async (isAdm : boolean) =>{

    if(isAdm === false){
        throw new AppError(403, "Must be admin");
    }

    const userRepository = AppDataSource.getRepository(Users);
    const users = await userRepository.find();
    return users;
}