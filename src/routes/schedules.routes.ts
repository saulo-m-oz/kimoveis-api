import {Router} from "express";
import { createScheduleController } from "../controllers/schedules/createSchedule.controller";
import { listScheduleController } from "../controllers/schedules/listSchedule.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

export const scheduleRouter = Router();

scheduleRouter.post("", ensureAuthMiddleware, createScheduleController);
scheduleRouter.get("/properties/:id", ensureAuthMiddleware, listScheduleController);