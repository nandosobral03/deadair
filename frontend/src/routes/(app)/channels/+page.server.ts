
import { PUBLIC_API_URL } from "$env/static/public"
import axios from "axios"
export const load = async ({ cookies }) => {
    const token = cookies.get('token');
    if (!token) {
        return {
            status: 302,
            redirect: '/login',
        }
    }
    const channels = await axios.get(`${PUBLIC_API_URL}/channels`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return {
        channels: channels.data,
    }
}