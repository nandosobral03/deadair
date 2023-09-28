import { SharedChannelTable } from "../database/types";
import { db } from "../database/db";

export const getSharedUsersForChannel = async (channelId: string, userId: string) => {
    const channelOwner = await db.selectFrom('channel').select(['userId']).where('id', '=', channelId).executeTakeFirst();
    const users = await db.selectFrom('sharedChannel').select(['userId', 'sharedChannel.createdAt']).leftJoin('user', 'user.id', 'sharedChannel.userId').select(['user.username']).where('channelId', '=', channelId).execute();
    if (!channelOwner) throw { status: 404, message: 'Channel not found' };
    if (channelOwner.userId === userId || users.some(u => u.userId === userId)) {
        return users || [];
    } else {
        throw { status: 401, message: 'Unauthorized' };
    }
}


export const joinChannel = async (channelId: string, userId: string) => {
    const channelOwner = await db.selectFrom('channel').select(['userId']).where('id', '=', channelId).executeTakeFirst();
    const users = await db.selectFrom('sharedChannel').select(['userId']).where('channelId', '=', channelId).execute();
    if (!channelOwner) throw { status: 404, message: 'Channel not found' };
    if (channelOwner.userId === userId || users.some(u => u.userId === userId)) {
        return;
    }
    const insert: SharedChannelTable = {
        channelId, userId,
        createdAt: new Date().getTime(),
    };
    await db.insertInto('sharedChannel').values(insert).execute();
}

export const leaveChannel = async (channelId: string, userId: string) => {
    const channelOwner = await db.selectFrom('channel').select(['userId']).where('id', '=', channelId).executeTakeFirst();
    const users = await db.selectFrom('sharedChannel').select(['userId']).where('channelId', '=', channelId).execute();
    if (!channelOwner) throw { status: 404, message: 'Channel not found' };
    if (channelOwner.userId === userId) {
        throw { status: 400, message: 'Channel owner cannot leave channel' };
    }
    if (users.some(u => u.userId === userId)) {
        await db.deleteFrom('sharedChannel').where('channelId', '=', channelId).where('userId', '=', userId).execute();
    }
}

export const removeUserFromChannel = async (channelId: string, userIdToRemove: string, userId: string) => {
    const channelOwner = await db.selectFrom('channel').select(['userId']).where('id', '=', channelId).executeTakeFirst();
    const users = await db.selectFrom('sharedChannel').select(['userId']).where('channelId', '=', channelId).execute();
    if (!channelOwner) throw { status: 404, message: 'Channel not found' };
    if (channelOwner.userId !== userId) {
        throw { status: 401, message: 'Unauthorized' };
    }
    if (users.some(u => u.userId === userIdToRemove)) {
        await db.deleteFrom('sharedChannel').where('channelId', '=', channelId).where('userId', '=', userIdToRemove).execute();
    }
}