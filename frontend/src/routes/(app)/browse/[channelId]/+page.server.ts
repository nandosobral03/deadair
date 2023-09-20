
import { API_URL } from "$env/static/private"
import type { Channel } from "$lib/model/channel.model"
import type { ScheduleGet } from "$lib/model/schedule.model"
import axios from "axios"
export const load = async ({ params }: { params: { channelId: string } }) => {
    const { channelId } = params
    const channel = await axios.get(`${API_URL}/channels/${channelId}`)
    const schedule = await axios.get(`${API_URL}/schedule/${channelId}`)
    return {
        channel: channel.data as Channel,
        schedule: schedule.data as ScheduleGet[]
    }
}