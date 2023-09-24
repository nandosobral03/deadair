import { PUBLIC_API_URL } from "$env/static/public";
import type { ScheduleCreateRequest } from "$lib/model/schedule.model";
import { loadingStore } from "$lib/stores/loading.store";
import axios from "axios";

export const putScheduleAPI = async (schedule: ScheduleCreateRequest[], channelId: string, token: string, type: "user" | "public") => {
    loadingStore.setMessage('Updating schedule...');

    const url = type === "public" ? `${PUBLIC_API_URL}/admin/channel/${channelId}/schedule` : `${PUBLIC_API_URL}/schedule/${channelId}`;
    const data = await axios.put(
        url,
        {
            items: schedule
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return data;
}