export type ScheduleGet = {
    category: string
    channelId: string
    duration: number
    endTime: number
    startTime: number
    thumbnail: string
    title: string
    videoId: string
}

export type ScheduleCreate = {
    scheduleId: string;
    videoId: string;
    startTime: number;
    duration: number;
    thumbnail: string;
    title: string;
}

export type ScheduleCreateRequest = {
    channelId: string;
    videoId: string;
    startTime: number;
    endTime: number;
}