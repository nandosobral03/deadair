import { API_URL } from "$env/static/private"
import type { Channel } from "$lib/model/channel.model"
import type { ScheduleGet } from "$lib/model/schedule.model"
import axios from "axios"
import jwt from "jsonwebtoken"

export const load = async ({ params, cookies }) => {
    const { number } = params
    const token = cookies.get('token');
    const channel = await axios.get(`${API_URL}/channels/station/${number}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const schedule = await axios.get(`${API_URL}/schedule/${channel.data.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return {
        channel: channel.data as Channel,
        schedule: schedule.data as ScheduleGet[]
    }
}