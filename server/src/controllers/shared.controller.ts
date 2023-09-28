import { NextFunction, Request, Response } from "express";
import { getSharedUsersForChannel, joinChannel, leaveChannel, removeUserFromChannel } from "../services/shared.service";

import { TokenPayload } from "../middleware/jwt.middleware";

const getSharedUsersForChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId;
        const payload: TokenPayload = res.locals.payload;
        const userId = payload.sub;
        if (!userId) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }
        console.log(userId, channelId)
        const users = await getSharedUsersForChannel(channelId, userId);
        res.status(200).send(users);
    } catch (e) {
        next(e);
    }
}

const joinSharedChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId;
        const payload: TokenPayload = res.locals.payload;
        const userId = payload.sub;
        if (!userId) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }
        await joinChannel(channelId, userId);
        res.status(204).json();
    } catch (e) {
        next(e);
    }
}
const leaveSharedChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId;
        const payload: TokenPayload = res.locals.payload;
        const userId = payload.sub;
        if (!userId) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }
        await leaveChannel(channelId, userId);
        res.status(204).json();
    } catch (e) {
        next(e);
    }
}

const removeUserFromSharedChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId;
        const userIdToRemove = req.params.userId;
        const payload: TokenPayload = res.locals.payload;
        const userId = payload.sub;
        if (!userId) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }
        await removeUserFromChannel(channelId, userIdToRemove, userId);
        res.status(204).json();
    } catch (e) {
        next(e);
    }
}


export default { getSharedUsersForChannelCall, joinSharedChannelCall, leaveSharedChannelCall, removeUserFromSharedChannelCall }