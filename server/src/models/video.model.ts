export type CreateVideoModel = {
    videoId: string;
}

export const isCreateVideoModel = (obj: any): obj is CreateVideoModel => {
    return typeof obj.videoId === 'string';
}