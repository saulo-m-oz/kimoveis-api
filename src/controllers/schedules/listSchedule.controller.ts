import {Request, Response} from "express";
import { listScheduleService } from "../../services/schedules/listSchedules.service";

export const listScheduleController = async (req: Request, res: Response) =>{
    const isAdm = req.user.isAdm;
    const {id} = req.params;
    const scheduleProperty = await listScheduleService(id, isAdm);
    return res.json(scheduleProperty);
}