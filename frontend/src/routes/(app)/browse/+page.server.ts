import { PUBLIC_API_URL } from "$env/static/public"
import axios from "axios"

export const load = async ({ cookies }) => {
    console.log("cookies", cookies.getAll())
    const token = cookies.get('token');
    const channels = await axios.get(`${PUBLIC_API_URL}/channels`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return {
        channels: channels.data,
    }
}