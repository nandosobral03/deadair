/*
router.post("/channel/", c.createPublicChannelCall);
router.put("/channel:id", c.updatePublicChannelCall);
router.put("/channel/:channelId/schedule", c.putPublicChannelScheduleCall);
*/
import { NextFunction, Request, Response } from "express"
import { deleteChannel, insertChannel, putChannelSchedule, updateChannel } from "../services/channel.service";
import { isCreateChannel, isCreateSchedule } from "../models/channel.model";
import { addVideoToChannel, removeVideoFromChannel } from "../services/video.service";


const createPublicChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const key = req.headers["x-api-key"];
        if (key !== process.env.API_KEY) {
            res.status(401).send("Unauthorized");
            return;
        }

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

        const key = req.headers["x-api-key"];
        if (key !== process.env.API_KEY) {
            res.status(401).send("Unauthorized");
            return;
        }

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

        const key = req.headers["x-api-key"];
        if (key !== process.env.API_KEY) {
            res.status(401).send("Unauthorized");
            return;
        }

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

        const key = req.headers["x-api-key"];
        if (key !== process.env.API_KEY) {
            res.status(401).send("Unauthorized");
            return;
        }

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
        const key = req.headers["x-api-key"];
        if (key !== process.env.API_KEY) {
            res.status(401).send("Unauthorized");
            return;
        }
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
        const key = req.headers["x-api-key"];
        if (key !== process.env.API_KEY) {
            res.status(401).send("Unauthorized");
            return;
        }
        const { videoId, channelId } = req.params;
        await removeVideoFromChannel(videoId, channelId);
        res.status(200).send();

    }
    catch (err: any) {
        next(err)
    }
}


export default { createPublicChannelCall, updatePublicChannelCall, deletePublicChannelCall, putPublicChannelScheduleCall, addVideoToChannelCall, removeVideoFromChannelCall }