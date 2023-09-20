import { PUBLIC_API_URL } from "$env/static/public";
import type { Channel } from "$lib/model/channel.model";
import { loadingStore } from "$lib/stores/loading.store";
import axios from "axios";
import { writable } from "svelte/store";

export const createChannelAPI = async (name: string, description: string, channelNumber: number, userId?: string) => {
    loadingStore.setMessage('Creating channel...');
    if (!userId) {
        const data = await axios.post<{ id: string }>(
            `${PUBLIC_API_URL}/admin/channel/`,
            {
                name,
                description,
                channelNumber,
                thumbnail: ''
            },
            {
                headers: {
                    'x-api-key': localStorage.getItem('x-api-key')
                }
            }
        );
        channelStore.update((all) => ({ ...all, publicChannels: [...all.publicChannels, { id: data.data.id, name, description, channelNumber, thumbnail: '' }] }));
        return { id: data.data.id }
    } else {
        const data = await axios.post<{ id: string }>(
            `${PUBLIC_API_URL}/channels/`,
            {
                name,
                description,
                channelNumber,
                thumbnail: ''
            },
            {
                headers: {
                    'user-id': userId
                }
            }
        );
        channelStore.update((all) => ({ ...all, privateChannels: [...all.privateChannels, { id: data.data.id, name, description, channelNumber, thumbnail: '' }] }));
        return { id: data.data.id }
    }
}


export const updateChannelAPI = async (id: string, name: string, description: string, channelNumber: number, thumbnail: string, userId?: string) => {
    loadingStore.setMessage('Updating channel...');
    if (!userId) {
        const data = await axios.put(
            `${PUBLIC_API_URL}/admin/channel/${id}`,
            {
                name,
                description,
                channelNumber,
                thumbnail
            },
            {
                headers: {
                    'x-api-key': localStorage.getItem('x-api-key')
                }
            }
        );
        channelStore.update((all) => ({ ...all, publicChannels: all.publicChannels.map((channel) => { if (channel.id === id) { return { id, name, description, channelNumber, thumbnail } } else { return channel } }) }));
        return data;
    } else {
        const data = await axios.put(
            `${PUBLIC_API_URL}/channels/${id}`,
            {
                name,
                description,
                channelNumber,
                thumbnail
            },
            {
                headers: {
                    'user-id': userId
                }
            }
        );
        channelStore.update((all) => ({ ...all, privateChannels: all.privateChannels.map((channel) => { if (channel.id === id) { return { id, name, description, channelNumber, thumbnail } } else { return channel } }) }));
        return data;

    }
}


export const channelStore = writable<{
    publicChannels: Channel[],
    privateChannels: Channel[]
}>(
    {
        publicChannels: [],
        privateChannels: []
    }
);