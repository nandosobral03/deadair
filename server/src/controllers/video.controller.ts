import { isCreateVideoModel } from "../models/video.model"
import { Request, Response } from "express";
import { createVideo, getVideos, getVideo, addVideoToChannel } from "../services/video.service";

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
        const videos = await getVideos();
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

const addVideoToCategoryCall = async (req: Request, res: Response, next: any) => {
    try {
        const { id, categoryId } = req.params;
        const userId = ""
        await addVideoToChannel(id, categoryId, userId);
        res.status(200).send();
    }
    catch (err: any) {
        next(err);
    }
}


export default { addVideoCall, getVideosCall, getVideoCall, addVideoToCategoryCall };