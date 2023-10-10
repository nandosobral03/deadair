import type { Channel } from "$lib/model/channel.model";
import { PUBLIC_API_URL } from "$env/static/public";
import axios from "axios";
import { loadingStore } from "$lib/stores/loading.store";
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
        channelStore.update((all) => ({ ...all, publicChannels: [...all.publicChannels, { id: data.data.id, name, description, channelNumber, thumbnail: '', randomize: false, shouldRandomizeAt: 0 }] }));
    } else {
        channelStore.update((all) => ({ ...all, userChannels: [...all.userChannels, { id: data.data.id, name, description, channelNumber, thumbnail: '', randomize: false, shouldRandomizeAt: 0 }] }));
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
        channelStore.update((all) => ({ ...all, publicChannels: all.publicChannels.map((channel) => { if (channel.id === id) { return { id, name, description, channelNumber, thumbnail, randomize: false, shouldRandomizeAt: 0 } } else { return channel } }) }));
    } else {
        channelStore.update((all) => ({ ...all, userChannels: all.userChannels.map((channel) => { if (channel.id === id) { return { id, name, description, channelNumber, thumbnail, randomize: false, shouldRandomizeAt: 0 } } else { return channel } }) }));
    }
    return data;
}


export const deleteChannelAPI = async (id: string, token: string, type: 'public' | 'user') => {
    loadingStore.setMessage('Deleting channel...');
    const url = type === 'public' ? `${PUBLIC_API_URL}/admin/channel/${id}` : `${PUBLIC_API_URL}/channels/${id}`;
    const data = await axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (type === 'public') {
        channelStore.update((all) => ({ ...all, publicChannels: all.publicChannels.filter((channel) => channel.id !== id) }));
    } else {
        channelStore.update((all) => ({ ...all, userChannels: all.userChannels.filter((channel) => channel.id !== id) }));
    }
}


export const joinChannelAPI = async (id: string, token: string) => {
    loadingStore.setMessage('Joining channel...');
    const url = `${PUBLIC_API_URL}/shared/${id}`;
    const data = await axios.post(url, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
}






export const channelStore = writable<{
    publicChannels: Channel[],
    userChannels: Channel[],
    sharedChannels: Channel[]
}>(
    {
        publicChannels: [],
        userChannels: [],
        sharedChannels: []
    }
);
