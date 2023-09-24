
import { API_URL } from "$env/static/private"
import type { Channel } from "$lib/model/channel.model"
import type { Video } from "$lib/model/video.model"
import axios from "axios"
export const load = async ({ params, cookies }) => {
    const { channelId } = params
    const token = cookies.get('token');
    const channel = await axios.get(`${API_URL}/channels/${channelId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const videos = await axios.get(`${API_URL}/videos`, {
        params: {
            channelId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return {
        channel: channel.data as Channel,
        videos: videos.data as Video[],
        token
    }
}