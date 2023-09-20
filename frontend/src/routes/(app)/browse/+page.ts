
import { PUBLIC_API_URL } from "$env/static/public"
import axios from "axios"
export const load = async () => {
    const channels = await axios.get(`${PUBLIC_API_URL}/channels`)
    console.log("Called channels", channels.data)
    return {
        channels: channels.data,
    }
}