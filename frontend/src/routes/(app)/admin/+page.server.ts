
import { API_URL } from "$env/static/private"
import axios from "axios"
export const load = async () => {
    const videos = await axios.get(`${API_URL}/videos`)
    const channels = await axios.get(`${API_URL}/channels`)
    console.log(videos.data)
    return {
        videos: videos.data,
        channels: channels.data,
    }
}