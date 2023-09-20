import { PUBLIC_API_URL } from "$env/static/public";
import type { ScheduleCreateRequest } from "$lib/model/schedule.model";
import { loadingStore } from "$lib/stores/loading.store";
import axios from "axios";

export const putScheduleAPI = async (schedule: ScheduleCreateRequest[], channelId: string, userId?: string) => {
    loadingStore.setMessage('Updating schedule...');
    if (!userId) {
        const data = await axios.put(
            `${PUBLIC_API_URL}/admin/channel/${channelId}/schedule`,
            {
                items: schedule
            },
            {
                headers: {
                    'x-api-key': localStorage.getItem('x-api-key')
                }
            }
        )
        return data;
    } else {
        const data = await axios.put(
            `${PUBLIC_API_URL}/channel/${channelId}/schedule`,
            {
                items: schedule
            },
            {
                headers: {
                    'user-id': userId
                }
            }
        )
        return data;
    }
}