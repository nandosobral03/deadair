
import { PUBLIC_API_URL } from "$env/static/public"
import type { Channel } from "$lib/model/channel.model"
import type { ScheduleGet } from "$lib/model/schedule.model"
import axios from "axios"
export const load = async ({ params }: { params: { channelId: string } }) => {
    const { channelId } = params
    const channel = await axios.get(`${PUBLIC_API_URL}/channels/${channelId}`)
    const schedule = await axios.get(`${PUBLIC_API_URL}/schedule/${channelId}`)
    return {
        channel: channel.data as Channel,
        schedule: schedule.data as ScheduleGet[]
    }
}