import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

export const deactivateUser = async (id : string, isAdm : boolean) =>{

    if(isAdm === false){
        throw new AppError(403, "Must be admin");
    }

    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({where: {id: id}});

    if(!user){
        throw new AppError(404, "Invalid ID or User");
    }

    if(!user.isActive){
        throw new AppError(400, "Invalid User");
    }

    user.isActive = false;

    await userRepository.save(user);

    return user;

}