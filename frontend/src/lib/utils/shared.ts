import { PUBLIC_API_URL } from "$env/static/public"
import axios from "axios"

export const leaveChannelAPI = async (channelId: string, token: string) => {
    const url = `${PUBLIC_API_URL}/shared/${channelId}`
    const res = await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const removeUserFromChannelAPI = async (channelId: string, userId: string, token: string) => {
    const url = `${PUBLIC_API_URL}/shared/${channelId}/${userId}`
    const res = await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}