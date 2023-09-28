/*
router.post("/channel/", c.createPublicChannelCall);
router.put("/channel:id", c.updatePublicChannelCall);
router.put("/channel/:channelId/schedule", c.putPublicChannelScheduleCall);
*/
import { NextFunction, Request, Response } from "express"
import { deleteChannel, insertChannel, putChannelSchedule, updateChannel } from "../services/channel.service";
import { isCreateChannel, isCreateSchedule } from "../models/channel.model";
import { addVideoToChannel, removeVideoFromChannel } from "../services/video.service";
import { TokenPayload } from "../middleware/jwt.middleware";


const createPublicChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: TokenPayload = res.locals.payload;
        if (!payload.isAdmin) throw { status: 401, message: "Unauthorized" };
        if (!isCreateChannel(req.body)) {
            res.status(400).send("Bad Request");
            return;
        }
        const id = await insertChannel(req.body);
        res.status(201).send(id);
    }
    catch (err: any) {
        next(err)
    }
}

const updatePublicChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: TokenPayload = res.locals.payload;
        if (!payload.isAdmin) throw { status: 401, message: "Unauthorized" };
        if (!isCreateChannel(req.body)) {
            res.status(400).send("Bad Request");
            return;
        }
        const id = req.params.channelId;
        await updateChannel(id, req.body);
        res.status(204).send();
    }
    catch (err: any) {
        next(err)
    }
}


const deletePublicChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: TokenPayload = res.locals.payload;
        if (!payload.isAdmin) throw { status: 401, message: "Unauthorized" };
        const id = req.params.channelId;
        await deleteChannel(id);
        res.status(204).send();
    }
    catch (err: any) {
        next(err)
    }
}





const putPublicChannelScheduleCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: TokenPayload = res.locals.payload;
        if (!payload.isAdmin) throw { status: 401, message: "Unauthorized" };
        if (!isCreateSchedule(req.body)) {
            res.status(400).send("Bad Request");
            return;
        }

        const id = req.params.channelId;
        await putChannelSchedule(id, req.body);
        res.status(204).send();
    }
    catch (err: any) {
        next(err)
    }
}

const addVideoToChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: TokenPayload = res.locals.payload;
        if (!payload.isAdmin) throw { status: 401, message: "Unauthorized" };
        const { videoId, channelId } = req.params;
        await addVideoToChannel(videoId, channelId);
        res.status(200).send();

    }
    catch (err: any) {
        next(err)
    }
}


const removeVideoFromChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: TokenPayload = res.locals.payload;
        if (!payload.isAdmin) throw { status: 401, message: "Unauthorized" };
        const { videoId, channelId } = req.params;
        await removeVideoFromChannel(videoId, channelId);
        res.status(200).send();

    }
    catch (err: any) {
        next(err)
    }
}


export default { createPublicChannelCall, updatePublicChannelCall, deletePublicChannelCall, putPublicChannelScheduleCall, addVideoToChannelCall, removeVideoFromChannelCall }