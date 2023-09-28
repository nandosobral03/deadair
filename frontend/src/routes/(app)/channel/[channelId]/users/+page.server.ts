import { PUBLIC_API_URL } from "$env/static/public"
import axios from "axios"
import { redirect } from "@sveltejs/kit";

export const load = async ({ params, cookies }) => {
    const { channelId } = params;
    const token = cookies.get('token');
    if (!token) {
        throw redirect(302, '/login')
    }
    const channel = await axios.get(`${PUBLIC_API_URL}/channels/${channelId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const users = await axios.get(`${PUBLIC_API_URL}/shared/${channelId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })


    return {
        channel: channel.data,
        users: users.data
    }
}