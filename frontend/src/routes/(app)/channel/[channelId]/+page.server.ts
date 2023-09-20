
import { invalidate } from "$app/navigation"
import { API_URL } from "$env/static/private"
import type { Channel } from "$lib/model/channel.model"
import type { ScheduleGet } from "$lib/model/schedule.model"
import type { Video } from "$lib/model/video.model"
import axios from "axios"
export const load = async ({ params }: { params: { channelId: string } }) => {
    const { channelId } = params
    const channel = await axios.get(`${API_URL}/channels/${channelId}`)
    // TODO: Get only channel videos
    const videos = await axios.get(`${API_URL}/videos`, {
        params: {
            channelId,
        },
    });
    const schedule = await axios.get(`${API_URL}/schedule/${channelId}`)
    return {
        channel: channel.data as Channel,
        videos: videos.data as Video[],
        schedule: schedule.data as ScheduleGet[]
    }
}