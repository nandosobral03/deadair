import { isCreateVideoModel } from "../models/video.model"
import { Request, Response } from "express";
import { createVideo, getVideos, getVideo, addVideoToChannel, removeVideoFromChannel } from "../services/video.service";
import { TokenPayload } from "../middleware/jwt.middleware";

const addVideoCall = async (req: Request, res: Response, next: any) => {
    try {
        if (isCreateVideoModel(req.body)) {
            const { videoId } = req.body;
            const video = await createVideo(videoId);
            res.status(201).send(video);
        }
        else {
            throw {
                status: 400,
                message: 'Invalid Video Model'
            }
        }
    }
    catch (err: any) {
        next(err);
    }
}

const getVideosCall = async (req: Request, res: Response, next: any) => {
    try {
        let { channelId } = req.query as { channelId: string | undefined };
        const payload: TokenPayload = res.locals.payload;
        console.log(payload);
        const userId = payload.sub
        const videos = await getVideos({ channelId, userId });
        res.status(200).send(videos);
    }
    catch (err: any) {
        next(err);
    }
}

const getVideoCall = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;
        const video = await getVideo(id);
        res.status(200).send(video);
    }
    catch (err: any) {
        next(err);
    }
}

const addVideoToChannelCall = async (req: Request, res: Response, next: any) => {
    try {
        const { id, channelId } = req.params;
        const payload: TokenPayload = res.locals.payload;
        const userId = payload.sub
        await addVideoToChannel(id, channelId, userId);
        res.status(200).send();
    }
    catch (err: any) {
        next(err);
    }
}

const removeVideoFromChannelCall = async (req: Request, res: Response, next: any) => {
    try {
        const { id, channelId } = req.params;
        const payload: TokenPayload = res.locals.payload;
        const userId = payload.sub
        await removeVideoFromChannel(id, channelId, userId);
        res.status(200).send();
    }
    catch (err: any) {
        next(err);
    }
}


export default { addVideoCall, getVideosCall, getVideoCall, addVideoToChannelCall, removeVideoFromChannelCall }