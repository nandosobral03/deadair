
import { API_URL } from "$env/static/private"
import axios from "axios"
export const load = async ({ params }) => {
    const { channelId } = params
    const video = await axios.get(`${API_URL}/channels/${channelId}`)
    return {
        video: video.data,
    }
}