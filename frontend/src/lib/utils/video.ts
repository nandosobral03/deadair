import { PUBLIC_API_URL } from "$env/static/public";
import type { Video } from "$lib/model/video.model";
import { loadingStore } from "$lib/stores/loading.store";
import axios from "axios";
import { writable } from "svelte/store";

export const videoStore = writable<Map<string, Video[]>>(new Map());

export const addVideoToChannel = async (channelId: string, videoId: string, userId?: string) => {
    loadingStore.setMessage('Adding video to channel...');
    if (!userId) {
        // video/:videoId/channel/:channelId
        const data = await axios.put(
            `${PUBLIC_API_URL}/admin/video/${videoId}/channel/${channelId}`, {},
            {
                headers: {
                    'x-api-key': localStorage.getItem('x-api-key')
                }
            }
        );
        const video = await axios.get<Video>(`${PUBLIC_API_URL}/videos/${videoId}`);
        videoStore.update((all) => all.set(channelId, [...all.get(channelId) || [], video.data]));
        return data;
    } else {
        const data = await axios.put(
            `${PUBLIC_API_URL}/videos/${videoId}/channel/${channelId}`, {},
            {
                headers: {
                    'user-id': userId
                }
            }
        );
        const video = await axios.get<Video>(`${PUBLIC_API_URL}/videos/${videoId}`);
        videoStore.update((all) => all.set(channelId, [...all.get(channelId) || [], video.data]));
        return data;
    }
}

export const removeVideoFromChannel = async (channelId: string, videoId: string, userId?: string) => {
    loadingStore.setMessage('Removing video from channel...');
    if (!userId) {
        // video/:videoId/channel/:channelId
        const data = await axios.delete(
            `${PUBLIC_API_URL}/admin/video/${videoId}/channel/${channelId}`,
            {
                headers: {
                    'x-api-key': localStorage.getItem('x-api-key')
                }
            }
        );
        const video = await axios.get<Video>(`${PUBLIC_API_URL}/videos/${videoId}`);
        videoStore.update((all) => all.set(channelId, (all.get(channelId) || []).filter((v) => v.id !== video.data.id)));
        return data;
    } else {
        const data = await axios.delete(
            `${PUBLIC_API_URL}/videos/${videoId}/channel/${channelId}`,
            {
                headers: {
                    'user-id': userId
                }
            }
        );
        const video = await axios.get<Video>(`${PUBLIC_API_URL}/videos/${videoId}`);
        videoStore.update((all) => all.set(channelId, (all.get(channelId) || []).filter((v) => v.id !== video.data.id)));
        return data;
    }
}
