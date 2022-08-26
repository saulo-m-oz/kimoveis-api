import { Router } from "express";
import { createSessionController } from "../controllers/sessions/createSession.controller";

export const sessionRouter = Router();

sessionRouter.post("", createSessionController);
