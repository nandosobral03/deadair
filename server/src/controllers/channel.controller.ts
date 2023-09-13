import { NextFunction, Request, Response } from "express"
import { clearChannelSchedule, deleteChannel, getChannel, getChannelSchedule, getChannels, getCurrentVideo, getScheduleSummary, insertChannel, putChannelSchedule, updateChannel } from "../services/channel.service"
import { isCreateChannel, isCreateSchedule } from "../models/channel.model"

const getChannelsCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = ""
        const channels = await getChannels(userId)
        res.status(200).json(channels)
    }
    catch (err: any) {
        next(err)
    }
}

const getChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = undefined
        const id = req.params.id
        const channel = await getChannel(id, userId)
        res.status(200).json(channel)
    }
    catch (err: any) {
        next(err)
    }
}

const addChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!isCreateChannel(req.body)) {
            res.status(400).json({ message: 'Invalid channel' })
            return
        }
        const userId = ""
        const channel = req.body
        const newChannel = await insertChannel(channel, userId)
        res.status(200).json(newChannel)
    } catch (err: any) {
        next(err)
    }
}

const deleteChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = ""
        const id = req.params.id
        await deleteChannel(id, userId)

    }
    catch (err: any) {
        next(err)
    }
}

const updateChannelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!isCreateChannel(req.body)) {
            res.status(400).json({ message: 'Invalid channel' })
            return
        }
        const userId = ""
        const id = req.params.id
        const channel = req.body
        await updateChannel(id, channel, userId)
        res.status(200).json({ message: 'Channel updated' })
    } catch (err: any) {
        next(err)
    }
}

const getChannelScheduleCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId
        const userId = ""
        const schedule = await getChannelSchedule(channelId, userId)
        res.status(200).json(schedule)
    }
    catch (err: any) {
        next(err)
    }
}

const putChannelScheduleCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId
        const userId = ""
        const schedule = req.body
        if (!isCreateSchedule(schedule)) {
            res.status(400).json({ message: 'Invalid schedule' })
            return
        }
        await putChannelSchedule(channelId, schedule, userId)
        res.status(200).json({ message: 'Schedule updated' })
    } catch (err: any) {
        next(err)
    }
}

const clearChannelScheduleCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId
        const userId = ""
        await clearChannelSchedule(channelId, userId)
        res.status(200).json({ message: 'Schedule cleared' })
    }
    catch (err: any) {
        next(err)
    }
}

const getCurrentVideoCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId
        const userId = ""
        const video = await getCurrentVideo(channelId, userId)
        res.status(200).json(video)
    }
    catch (err: any) {
        next(err)
    }

}

const getScheduleSummaryCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channelId = req.params.channelId
        const userId = ""
        const summary = await getScheduleSummary(channelId, userId)
        res.status(200).json(summary)
    }
    catch (err: any) {
        next(err)
    }
}

export default {
    getChannelsCall,
    addChannelCall,
    deleteChannelCall,
    updateChannelCall,
    getChannelScheduleCall,
    putChannelScheduleCall,
    clearChannelScheduleCall,
    getCurrentVideoCall,
    getScheduleSummaryCall,
    getChannelCall
}