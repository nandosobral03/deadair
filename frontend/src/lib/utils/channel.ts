import { PUBLIC_API_URL } from "$env/static/public";
import axios from "axios";

export const createChannelAPI = async (name: string, description: string, channelNumber: number, userId?: string) => {
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
        return { id: data.data.id }
    }
}


export const updateChannelAPI = async (id: string, name: string, description: string, channelNumber: number, thumbnail: string, userId?: string) => {
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
        return data;
    }
}