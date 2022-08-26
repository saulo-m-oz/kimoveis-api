import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import {IUserRequest} from "../../interfaces/users/index"
import * as bcrypt from "bcrypt";

export const createUserService = async ( {name, email, password, isAdm} : IUserRequest ) =>{
    const userRepository = AppDataSource.getRepository(Users);
    const userAlreadyExists = await userRepository.findOne({where: {email: email}});

    if(!password){
        throw new AppError(400, "Missing password");
    }

    if(userAlreadyExists){
        throw new AppError(400, "Email already registered.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
        name,
        email,
        password: hashPassword,
        isAdm
    });

    await userRepository.save(newUser);

    return newUser;
}