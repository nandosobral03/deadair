import { YoutubeAPI, durationToSeconds, getCategoryName } from '../utils/youtube';
import { db } from '../database/db';
import { VideoInsert } from '../database/types';
import { getChannels } from './channel.service';

export const createVideo = async (videoId: string) => {
    const videoInfo = await YoutubeAPI.videos.list({ id: [videoId], part: ['snippet', 'contentDetails', 'statistics'] });
    if (videoInfo.data.items?.length === 0) throw {
        status: 404,
        message: 'Video not found'
    }
    const video = videoInfo.data.items![0]!
    let insert: VideoInsert = {
        id: videoId!,
        title: video.snippet!.title!,
        thumbnail: video.snippet!.thumbnails!.high!.url!,
        duration: durationToSeconds(video.contentDetails!.duration!),
        category: getCategoryName(video.snippet?.categoryId!)!,
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
    const video = await db.selectFrom('video').select(['id', 'title', 'thumbnail', 'duration', 'category']).where("id", "=", id).execute();
    if (video.length === 0) throw {
        status: 404,
        message: 'Video not found'
    }
    return video[0];
}


export const addVideoToChannel = async (id: string, channelId: string, userId: string) => {
    const channel = await db.selectFrom('channel').select(['id']).where("id", "=", channelId).executeTakeFirst();
    if (!channel) throw { status: 404, message: 'Channel not found' };
    const video = await db.insertInto('videoChannel').values({ videoId: id, channelId: channelId, userId: userId }).returning("videoId").execute();
    if (video.length === 0) throw {
        status: 404,
        message: 'Video not found'
    }

}

export const getVideos = async (userId?: string) => {
    if (userId) {
        const allVideos = await db.selectFrom('video').select(['id', 'title', 'thumbnail', 'duration', 'category']).fullJoin('videoChannel', 'video.id', 'videoChannel.videoId').execute();
        const videosWithChannels = await Promise.all(allVideos.map(async (video) => {
            const userChannels = await db
                .selectFrom("videoChannel")
                .select(["channelId"]).where("videoId", "=", video.id)
                .where("userId", "=", userId)
                .fullJoin("channel", "videoChannel.channelId", "channel.id")
                .select(["id", "name", "thumbnail", "description", "channelNumber", "userId", "createdAt"])
                .execute();

            const publicChannels = await db
                .selectFrom("videoChannel")
                .select(["channelId"]).where("videoId", "=", video.id)
                .where("userId", "=", null)
                .fullJoin("channel", "videoChannel.channelId", "channel.id")
                .select(["id", "name", "thumbnail", "description", "channelNumber", "userId", "createdAt"])
                .execute();

            return {
                ...video,
                channels: [...userChannels, ...publicChannels]
            }
        }));
        return videosWithChannels;
    } else {
        const allVideos = await db.selectFrom('video').select(['id', 'title', 'thumbnail', 'duration', 'category']).fullJoin('videoChannel', 'video.id', 'videoChannel.videoId').execute();
        const videosWithChannels = await Promise.all(allVideos.map(async (video) => {
            const publicChannels = await db
                .selectFrom("videoChannel")
                .select(["channelId"]).where("videoId", "=", video.id)
                .where("userId", "=", null)
                .fullJoin("channel", "videoChannel.channelId", "channel.id")
                .select(["id", "name", "thumbnail", "description", "channelNumber", "userId", "createdAt"])
                .execute();
            return {
                ...video,
                channels: [...publicChannels]
            }
        }));
        return videosWithChannels;
    }
}

