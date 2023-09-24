import { PUBLIC_API_URL } from "$env/static/public";
import type { Channel } from "$lib/model/channel.model";
import { loadingStore } from "$lib/stores/loading.store";
import axios from "axios";
import { writable } from "svelte/store";

export const createChannelAPI = async (name: string, description: string, channelNumber: number, token: string, type: 'public' | 'user') => {
    loadingStore.setMessage('Creating channel...');
    const url = type === 'public' ? `${PUBLIC_API_URL}/admin/channel/` : `${PUBLIC_API_URL}/channels/`;
    const data = await axios.post<{ id: string }>(url, {
        name,
        description,
        channelNumber,
        thumbnail: ''
    },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    if (type === 'public') {
        channelStore.update((all) => ({ ...all, publicChannels: [...all.publicChannels, { id: data.data.id, name, description, channelNumber, thumbnail: '' }] }));
    } else {
        channelStore.update((all) => ({ ...all, userChannels: [...all.userChannels, { id: data.data.id, name, description, channelNumber, thumbnail: '' }] }));
    }
    return { id: data.data.id }
}


export const updateChannelAPI = async (id: string, name: string, description: string, channelNumber: number, thumbnail: string, token: string, type: 'public' | 'user') => {
    loadingStore.setMessage('Updating channel...');
    const url = token ? `${PUBLIC_API_URL}/channels/${id}` : `${PUBLIC_API_URL}/admin/channel/${id}`;
    const data = await axios.put(
        url,
        {
            name,
            description,
            channelNumber,
            thumbnail
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    if (type === 'public') {
        channelStore.update((all) => ({ ...all, publicChannels: all.publicChannels.map((channel) => { if (channel.id === id) { return { id, name, description, channelNumber, thumbnail } } else { return channel } }) }));
    } else {
        channelStore.update((all) => ({ ...all, userChannels: all.userChannels.map((channel) => { if (channel.id === id) { return { id, name, description, channelNumber, thumbnail } } else { return channel } }) }));
    }
    return data;
}


export const channelStore = writable<{
    publicChannels: Channel[],
    userChannels: Channel[]
}>(
    {
        publicChannels: [],
        userChannels: []
    }
);