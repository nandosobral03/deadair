import { ChannelInsert, ChannelUpdate } from '../database/types';
import { CreateChannel, CreateSchedule } from '../models/channel.model';

import dayjs from 'dayjs';
import { db } from '../database/db';
import { timeSinceWeekStart } from '../utils/time';
import { ulid } from 'ulid'

const checkIfChannelNumberExists = async (channelNumber: number, userId?: string) => {
    let exists = await db.selectFrom('channel').select(['id']).where("channelNumber", "=", channelNumber).where("userId", "is", undefined).executeTakeFirst();
    if (userId) exists ||= await db.selectFrom('channel').select(['id']).where("channelNumber", "=", channelNumber).where("userId", "=", userId).executeTakeFirst();
    if (exists) throw { status: 400, message: 'Channel number is already taken' }
}


export const userCanSeeChannel = async (channelId: string, userId?: string) => {
    const channel = await db.selectFrom('channel').select(['id', 'userId']).where("id", "=", channelId).executeTakeFirst();
    if (!channel) throw { status: 404, message: 'Channel not found' }
    const channelIsPublic = channel.userId === null;
    if (!userId) {
        return channelIsPublic;
    } else {
        const userIsOwner = channel.userId === userId;
        const userIsShared = await db.selectFrom('sharedChannel').select(['userId']).where("channelId", "=", channelId).where("userId", "=", userId).executeTakeFirst();
        return channelIsPublic || userIsOwner || userIsShared;
    }
}

export const channelIsPublicOrUserIsOwner = async (channelId: string, userId?: string) => {
    const channel = await db.selectFrom('channel').select(['id', 'userId']).where("id", "=", channelId).executeTakeFirst();
    if (!channel) throw { status: 404, message: 'Channel not found' }
    const channelIsPublic = channel.userId === null;
    if (!userId) {
        return channelIsPublic;
    } else {
        const userIsOwner = channel.userId === userId;
        return channelIsPublic || userIsOwner;
    }
}


export const insertChannel = async (channel: CreateChannel, userId?: string) => {
    await checkIfChannelNumberExists(channel.channelNumber, userId);
    let insert: ChannelInsert = {
        id: ulid(),
        ...channel,
        userId,
        createdAt: new Date().getTime().toString(),
        randomize: 0,
        shouldRandomizeAfter: 0,
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
    let userChannels: { id: string, name: string, thumbnail: string, description: string, channelNumber: number }[] = [];
    let sharedChannels: { id: string, name: string, thumbnail: string, description: string, channelNumber: number }[] = [];
    if (userId) {
        userChannels = await db.selectFrom('channel')
            .select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'randomize', 'shouldRandomizeAfter'])
            .where("userId", "=", userId).execute();

        sharedChannels = await db.selectFrom('channel')
            .select(['channel.id', 'channel.name', 'channel.thumbnail', 'channel.description', 'channel.channelNumber', 'randomize', 'shouldRandomizeAfter'])
            .leftJoin('sharedChannel', 'channel.id', 'sharedChannel.channelId')
            .where("sharedChannel.userId", "=", userId).execute();

    }

    const publicChannels = await db.selectFrom('channel')
        .select(['id', 'name', 'thumbnail', 'description', 'channelNumber'])
        .where("userId", "is", undefined).execute();



    return {
        userChannels,
        publicChannels,
        sharedChannels,
    };
}


export const getChannel = async (id: string, userId?: string) => {
    const channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId', 'shouldRandomizeAfter', 'randomize']).where("id", "=", id).executeTakeFirst();
    if (!channel) throw {
        status: 404,
        message: 'Channel not found'
    }
    return channel;
}


export const deleteChannel = async (id: string, userId?: string) => {
    if (!userId) {
        await db.deleteFrom('channel').where("id", "=", id).returning("id").execute();
    } else {
        await db.deleteFrom('channel').where("id", "=", id).where("userId", "=", userId).returning("id").execute();
    }
}

export const updateChannel = async (id: string, channel: CreateChannel, userId?: string) => {
    let channelInfo = await getChannel(id, userId);
    if (channelInfo.userId && channelInfo.userId != userId) throw { status: 401, message: 'Unauthorized' }

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
    if (!await userCanSeeChannel(channelId, userId)) throw { status: 401, message: 'Unauthorized' }
    const channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId', 'shouldRandomizeAfter', 'randomize']).where("id", "=", channelId).executeTakeFirst();
    if (channel?.randomize && channel.shouldRandomizeAfter < dayjs().valueOf()) {
        const schedule = await db.selectFrom('schedule_item').select(['channelId', 'videoId', 'startTime', 'endTime']).where("channelId", "=", channelId).rightJoin('video', 'schedule_item.videoId', 'video.id').select(['video.title', 'video.thumbnail', 'video.duration', 'video.category']).execute();
        const shuffledSchedule = schedule.sort(() => Math.random() - 0.5);
        const shouldRandomizeAfter = dayjs().add(1, 'week').startOf('week').add(1, 'day').valueOf();
        await db.updateTable('channel').set({ shouldRandomizeAfter }).where("id", "=", channelId).execute();
        return shuffledSchedule;
    }

    const schedule = await db.selectFrom('schedule_item').select(['channelId', 'videoId', 'startTime', 'endTime']).where("channelId", "=", channelId).rightJoin('video', 'schedule_item.videoId', 'video.id').select(['video.title', 'video.thumbnail', 'video.duration', 'video.category']).execute();
    return schedule;
}

export const clearChannelSchedule = async (channelId: string, userId?: string) => {
    let channel = await db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId']).where("id", "=", channelId).executeTakeFirst();
    if (! await channelIsPublicOrUserIsOwner(channelId, userId)) throw { status: 401, message: 'Unauthorized' }

    await db.deleteFrom('schedule_item').where("channelId", "=", channelId).execute();
    await db.updateTable('channel').set({ randomize: 0, shouldRandomizeAfter: 0 }).where("id", "=", channelId).execute();
}

export const putChannelSchedule = async (channelId: string, schedule: CreateSchedule, userId?: string) => {
    if (! await channelIsPublicOrUserIsOwner(channelId, userId)) throw { status: 401, message: 'Unauthorized' }

    await clearChannelSchedule(channelId, userId);
    if (schedule.items.length == 0) return;
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
    if (schedule.randomize) {
        const shouldRandomizeAfter = dayjs().add(1, 'week').startOf('week').add(1, 'day').valueOf();
        await db.updateTable('channel').set({ randomize: 1, shouldRandomizeAfter: shouldRandomizeAfter }).where("id", "=", channelId).execute();
    }
}

export const getCurrentVideo = async (channelId: string, userId?: string) => {
    if (! await userCanSeeChannel(channelId, userId)) throw { status: 401, message: 'Unauthorized' }
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
    if (! await userCanSeeChannel(channelId, userId)) throw { status: 401, message: 'Unauthorized' }
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

export const getChannelByChannelNumber = async (channelNumber: number, userId?: string) => {
    let statement = db.selectFrom('channel').select(['id', 'name', 'thumbnail', 'description', 'channelNumber', 'userId', 'randomize', 'shouldRandomizeAfter']).where("channelNumber", "=", channelNumber);
    const channel = await statement.where("userId", "is", undefined).executeTakeFirst();
    if (channel) return channel;
    else {
        if (!userId) throw { status: 404, message: 'Channel not found' }
        const channel = await statement.where("userId", "=", userId).executeTakeFirst();
        if (channel) return channel;
        else throw { status: 404, message: 'Channel not found' }
    }
}