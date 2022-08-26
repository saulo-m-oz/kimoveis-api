import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { deactivateUserController } from "../controllers/users/deactivateUser.controller";
import { listUsersController } from "../controllers/users/listUsers.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

export const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", ensureAuthMiddleware, listUsersController);
userRouter.delete("/:id", ensureAuthMiddleware, deactivateUserController);