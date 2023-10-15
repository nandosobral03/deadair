import { API_URL } from "$env/static/private";
import axios from "axios";
import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, params }) => {
    const { channelId } = params;
    console.log('channelId', channelId)
    const token = cookies.get('token');
    if (!token) {
        throw redirect(302, '/login')
    }

    console.log('token', token)
    console.log('channelId', channelId)
    const channel = await axios.get(`${API_URL}/channels/${channelId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return {
        channel: channel.data,
    }
}