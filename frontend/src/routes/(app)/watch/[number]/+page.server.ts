
import { PUBLIC_API_URL } from "$env/static/public"
import type { Channel } from "$lib/model/channel.model"
import type { ScheduleGet } from "$lib/model/schedule.model"
import axios from "axios"
import { error } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
    const { number } = params
    const token = cookies.get("token")
    try {
        const channel = await axios.get(`${PUBLIC_API_URL}/channels/station/${number}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        const schedule = await axios.get(`${PUBLIC_API_URL}/schedule/${channel.data.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        console.log(channel.data)
        return {
            channel: channel.data as Channel,
            schedule: schedule.data as ScheduleGet[]
        }
    } catch (e) {
        console.log(e)
        throw error(404, {
            message: 'Not found'
        });
    }
}