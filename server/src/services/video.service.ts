import { YoutubeAPI, durationToSeconds, getCategoryName } from '../utils/youtube';
import { db } from '../database/db';
import { VideoInsert } from '../database/types';

export const createVideo = async (videoId: string) => {
    const videoInfo = await YoutubeAPI.videos.list({ id: [videoId], part: ['snippet', 'contentDetails', 'statistics'] });
    if (videoInfo.data.items?.length === 0) throw {
        status: 404,
        message: 'Video not found'
    }
    console.log(videoInfo.data.items![0]!);
    const video = videoInfo.data.items![0]!
    let insert: VideoInsert = {
        id: videoId!,
        title: video.snippet!.title!,
        thumbnail: video.snippet!.thumbnails!.high!.url!,
        duration: durationToSeconds(video.contentDetails!.duration!),
        category: getCategoryName(video.snippet?.categoryId!)!,
        youtubeChannel: video.snippet!.channelTitle!,
    }
    const videoInsert = db.insertInto('video').values(insert).returning("id");
    try {
        const id = await videoInsert.execute();

        return {
            id: video.id,
            title: video.snippet?.title,
            thumbnail: video.snippet?.thumbnails?.high?.url,
            duration: durationToSeconds(video.contentDetails?.duration!),
            category: getCategoryName(video.snippet?.categoryId!),
            youtubeChannel: video.snippet?.channelTitle,
        }
    }
    catch (err: any) {
        throw {
            status: 500,
            message: err.code
        }
    }

}

export const getVideo = async (id: string) => {
    const video = await db.selectFrom('video').select(['id', 'title', 'thumbnail', 'duration', 'category', 'youtubeChannel']).where("id", "=", id).execute();
    if (video.length === 0) throw {
        status: 404,
        message: 'Video not found'
    }
    return video[0];
}


export const addVideoToChannel = async (id: string, channelId: string, userId?: string) => {
    const storedVideo = await db.selectFrom('video').select(['id']).where("id", "=", id).executeTakeFirst();
    if (!storedVideo) {
        await createVideo(id);
    }

    if (userId) {
        const channel = await db.selectFrom('channel').select(['id']).where("id", "=", channelId).where("userId", "=", userId).executeTakeFirst();
        if (!channel) throw { status: 404, message: 'Channel not found' };
        const exists = await db.selectFrom('videoChannel').select(['videoId']).where("videoId", "=", id).where("channelId", "=", channelId).executeTakeFirst();
        if (exists) throw { status: 409, message: 'Video already in channel' };
        const videoId = await db.insertInto('videoChannel').values({ videoId: id, channelId: channelId, userId: userId }).returning("videoId").execute();
        return videoId;
    }
    else {
        const channel = await db.selectFrom('channel').select(['id']).where("id", "=", channelId).where("userId", "is", undefined).executeTakeFirst();
        if (!channel) throw { status: 404, message: 'Channel not found' };
        const exists = await db.selectFrom('videoChannel').select(['videoId']).where("videoId", "=", id).where("channelId", "=", channelId).executeTakeFirst();
        if (exists) throw { status: 409, message: 'Video already in channel' };
        const videoId = await db.insertInto('videoChannel').values({ videoId: id, channelId: channelId }).returning("videoId").execute();
        return videoId;
    }
}


export const removeVideoFromChannel = async (id: string, channelId: string, userId?: string) => {
    if (userId) {
        const videoId = await db.deleteFrom('videoChannel').where("videoId", "=", id).where("channelId", "=", channelId).where("userId", "=", userId).returning("videoId").executeTakeFirst();
        return videoId;
    }
    else {
        const videoId = await db.deleteFrom('videoChannel').where("videoId", "=", id).where("channelId", "=", channelId).where("userId", "is", null).returning("videoId").executeTakeFirst();
        return videoId;
    }
}

export const getVideos = async ({ channelId, userId }: { channelId?: string, userId?: string }) => {
    if (channelId) {
        let channel = await db.selectFrom('channel').select(['id', 'userId']).where("id", "=", channelId).executeTakeFirst();
        if (!channel) throw { status: 404, message: 'Channel not found' };
        if (channel.userId && !userId || channel.userId && userId && channel.userId !== userId) throw { status: 403, message: 'Forbidden' };

        const videos = await db.selectFrom("video").select(['id', 'title', 'thumbnail', 'duration', 'category', 'youtubeChannel']).where("id", "in", db.selectFrom('videoChannel').select(['videoId']).where("channelId", "=", channelId)).execute();
        return videos;
    } else {
        return await db.selectFrom('video').select(['id', 'title', 'thumbnail', 'duration', 'category', 'youtubeChannel']).execute();
    }
}

