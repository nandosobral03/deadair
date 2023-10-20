import { PUBLIC_API_URL } from "$env/static/public";
import type { Video } from "$lib/model/video.model";
import { loadingStore } from "$lib/stores/loading.store";
import axios from "axios";
import { writable } from "svelte/store";

export const videoStore = writable<Map<string, Video[]>>(new Map());

export const addVideoToChannel = async (channelId: string, videoId: string, token: string, type: "user" | "public") => {
    loadingStore.setMessage('Adding video to channel...');
    const url = type === 'public' ? `${PUBLIC_API_URL}/admin/video/${videoId}/channel/${channelId}` : `${PUBLIC_API_URL}/videos/${videoId}/channel/${channelId}`;
    const data = await axios.put(url, {}, { headers: { 'Authorization': `Bearer ${token}` } });
    const video = await axios.get<Video>(`${PUBLIC_API_URL}/videos/${videoId}`);
    videoStore.update((all) => all.set(channelId, [...all.get(channelId) || [], video.data]));
    return data;
}

export const removeVideoFromChannel = async (channelId: string, videoId: string, token: string, type: "user" | "public") => {
    loadingStore.setMessage('Removing video from channel...');
    const url = type === 'public' ? `${PUBLIC_API_URL}/admin/video/${videoId}/channel/${channelId}` : `${PUBLIC_API_URL}/videos/${videoId}/channel/${channelId}`;
    const data = await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } });
    const video = await axios.get<Video>(`${PUBLIC_API_URL}/videos/${videoId}`);
    videoStore.update((all) => all.set(channelId, (all.get(channelId) || []).filter((v) => v.id !== video.data.id)));
    return data;
}


export const addPlaylistToChannelAPI = async (id: string, playlistId: string, token: string, type: "user" | "public") => {
    loadingStore.setMessage('Adding playlist to channel...');
    const url = type === 'public' ? `${PUBLIC_API_URL}/admin/playlist/${playlistId}/channel/${id}` : `${PUBLIC_API_URL}/videos/playlist/${playlistId}/channel/${id}`;
    const data = await axios.post(url, {}, { headers: { 'Authorization': `Bearer ${token}` } });
    videoStore.update((all) => all.set(id, [...all.get(id) || [], ...data.data]));
    return data;
}
