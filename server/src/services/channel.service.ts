import { db } from '../database/db';
import { ChannelInsert, ChannelUpdate } from '../database/types';
import { CreateChannel, CreateSchedule, CreateScheduleItem } from '../models/channel.model';
import { timeSinceWeekStart } from '../utils/time';
import { ulid } from 'ulid'

const checkIfChannelNumberExists = async (channelNumber: number, userId?: string) => {
    let exists = await db.selectFrom('channel').select(['id']).where("channelNumber", "=", channelNumber).where("userId", "is", undefined).executeTakeFirst();
    if (userId) exists ||= await db.selectFrom('channel').select(['id']).where("channelNumber", "=", channelNumber).where("userId", "=", userId).executeTakeFirst();
    if (exists) throw { status: 400, message: 'Channel number is already taken' }
}


export const insertChannel = async (channel: CreateChannel, userId?: string) => {
    await checkIfChannelNumberExists(channel.channelNumber, userId);
    let insert: ChannelInsert = {
        id: ulid(),
        ...channel,
        userId,
        createdAt: new Date().getTime().toString(),
    }
    const channelInsert = db.insertInto('channel').values(insert).returning("id");
    try {
        const id = await channelInsert.executeTakeFirst();
        return id
    }
    catch (err: any) {
        throw {
            status: 500,
            message: err.code
        }
    }
}

export const getChannels = async (userId: string | undefined) => {
    let userChannels: any[] = [];
    if (userId) {
        userChannels = await db.selectFrom('channel')
            .select(['id', 'name', 'thumbnail', 'description', 'channelNumber'])
            .where("userId", "=", userId).execute();
    }

    const publicChannels = await db.selectFrom('channel')
        .select(['id', 'name', 'thumbnail', 'description', 'channelNumber'])
        .where("userId", "is", undefined).execute();

    return {
        userChannels,
        publicChannels
    };
}


export const getChannel = async (id: string, userId?: string) => {
    console.log(id, userId);
    const channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId']).where("id", "=", id).executeTakeFirst();
    console.log(channel);
    if (!channel) throw {
        status: 404,
        message: 'Channel not found'
    }
    if (channel.userId != undefined && channel.userId != userId) throw { status: 404, message: 'Channel not found' }
    return channel;
}


export const deleteChannel = async (id: string, userId?: string) => {
    const channel = await db.deleteFrom('channel').where("id", "=", id).where("userId", "=", userId).returning("id").execute();
    if (channel.length === 0) throw {
        status: 404,
        message: 'Channel not found'
    }
}

export const updateChannel = async (id: string, channel: CreateChannel, userId?: string) => {
    let channelInfo = await getChannel(id, userId);
    let update: ChannelUpdate = {
        id: id,
        ...channel
    }
    if (channel.channelNumber != channelInfo.channelNumber) {
        await checkIfChannelNumberExists(channel.channelNumber, userId);
    }

    const channelUpdate = db.updateTable('channel').set(update).where("id", "=", id).returning("id");
    try {
        const id = await channelUpdate.execute();
        return {
            id: id[0],
        }
    }
    catch (err: any) {
        throw {
            status: 500,
            message: err.code
        }
    }
}




export const getChannelSchedule = async (channelId: string, userId?: string) => {
    let channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId']).where("id", "=", channelId).executeTakeFirst();
    if (!channel) throw { status: 404, message: 'Channel not found' }
    if (channel.userId != undefined && channel.userId != userId) throw { status: 401, message: 'Unauthorized' }


    const schedule = await db.selectFrom('schedule_item').select(['channelId', 'videoId', 'startTime', 'endTime']).where("channelId", "=", channelId).rightJoin('video', 'schedule_item.videoId', 'video.id').select(['video.title', 'video.thumbnail', 'video.duration', 'video.category']).execute();
    return schedule;
}

export const clearChannelSchedule = async (channelId: string, userId?: string) => {
    let channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId']).where("id", "=", channelId).executeTakeFirst();
    if (!channel) throw { status: 404, message: 'Channel not found' }
    if (channel.userId != undefined && channel.userId != userId) throw { status: 401, message: 'Unauthorized' }

    await db.deleteFrom('schedule_item').where("channelId", "=", channelId).execute();
}

export const putChannelSchedule = async (channelId: string, schedule: CreateSchedule, userId?: string) => {
    let channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId']).where("id", "=", channelId).executeTakeFirst();
    if (!channel) throw { status: 404, message: 'Channel not found' }
    if (channel.userId != undefined && channel.userId != userId) throw { status: 401, message: 'Unauthorized' }

    await clearChannelSchedule(channelId, userId);

    let scheduleInsert: any[] = [];
    for (let i = 0; i < schedule.items.length; i++) {
        const item = schedule.items[i];
        scheduleInsert.push({
            id: ulid(),
            channelId: channelId,
            videoId: item.videoId,
            startTime: item.startTime,
            endTime: item.endTime,
        })
    }
    await db.insertInto('schedule_item').values(scheduleInsert).execute();
}

export const getCurrentVideo = async (channelId: string, userId?: string) => {
    let channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId']).where("id", "=", channelId).executeTakeFirst();
    if (!channel) throw { status: 404, message: 'Channel not found' }
    if (channel.userId != undefined && channel.userId != userId) throw { status: 401, message: 'Unauthorized' }
    const now = timeSinceWeekStart();
    const schedule = await db.selectFrom('schedule_item').select(['id', 'channelId', 'videoId', 'startTime', 'endTime']).where("channelId", "=", channelId)
        .where("startTime", "<=", now).where("endTime", ">=", now).executeTakeFirst();
    if (!schedule) return null;

    const video = await db.selectFrom('video').select(['id', 'title', 'thumbnail', 'duration', 'category']).where("id", "=", schedule.videoId).executeTakeFirst();
    return {
        video,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
    };
}

export const getScheduleSummary = async (channelId: string, userId?: string) => {
    const schedule = await getChannelSchedule(channelId, userId);
    const now = timeSinceWeekStart();
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].startTime <= now && schedule[i].endTime >= now) {
            return {
                previous: i > 0 ? schedule[i - 1] : null,
                current: schedule[i],
                next: i < schedule.length - 1 ? schedule[i + 1] : null,
            }
        }
    }
    return {
        previous: null,
        current: null,
        next: null,
    }
}