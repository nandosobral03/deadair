export type CreateChannel = {
    name: string;
    thumbnail: string;
    description: string;
    channelNumber: number;
}

export type Channel = CreateChannel & { id: string };

export const isCreateChannel = (obj: any): obj is CreateChannel => {
    return typeof obj.name === 'string' &&
        typeof obj.thumbnail === 'string' &&
        typeof obj.description === 'string' &&
        typeof obj.channelNumber === 'number';
}

export const isChannel = (obj: any): obj is Channel => {
    return typeof obj.id === 'string' &&
        isCreateChannel(obj);
}


export type CreateSchedule = {
    items: CreateScheduleItem[]
}

export type CreateScheduleItem = {
    channelId: string;
    videoId: string;
    startTime: number;
    endTime: number;
}

export const isCreateScheduleItem = (obj: any): obj is CreateScheduleItem => {
    return typeof obj.channelId === 'string' &&
        typeof obj.videoId === 'string' &&
        typeof obj.startTime === 'number' &&
        obj.startTime >= 0 &&
        typeof obj.endTime === 'number' &&
        obj.endTime >= 0 &&
        obj.startTime < obj.endTime;
}

export const isCreateSchedule = (obj: any): obj is CreateSchedule => {
    return Array.isArray(obj.items) &&
        obj.items.every(isCreateScheduleItem);
}