import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createSession = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOne({ where: { email: email } });

  if (!user) {
    throw new AppError(403, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new AppError(403, "Invalid user");
  }

  const matchPassword = await compare(password, user.password);
  if (!matchPassword) {
    throw new AppError(403, "Invalid email or password");
  }

  const token = jwt.sign(
    { isAdm: user.isAdm },
    process.env.SECRET_KEY as string,
    { subject: user.id, expiresIn: "1h" }
  );

  return token;

};
