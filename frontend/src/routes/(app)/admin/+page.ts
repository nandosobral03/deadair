
import { PUBLIC_API_URL } from "$env/static/public"
import axios from "axios"
export const load = async () => {
    const channels = await axios.get(`${PUBLIC_API_URL}/channels`)
    return {
        channels: channels.data,
    }
}