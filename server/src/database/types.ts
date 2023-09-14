import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface DeadAirDb {
    video: VideosTable;
    channel: ChannelsTable;
    videoChannel: VideoChannelTable;
    schedule: ScheduleItemsTable;
    user: UsersTable;
    image: ImageTable;
}



export interface VideosTable {
    id: string
    title: string;
    thumbnail: string;
    duration: number;
    category: string;
}

export interface VideoChannelTable {
    videoId: string;
    channelId: string;
    userId: string;
}

export interface ImageTable {
    id: string;
    url: string;
    deleteHash: string;
    createdAt: number;
}

export type Video = Selectable<VideosTable>;
export type VideoInsert = Insertable<VideosTable>;

export interface ChannelsTable {
    id: string;
    name: string;
    thumbnail: string;
    description: string;
    channelNumber: number;
    userId: string | undefined;
    createdAt: ColumnType<string, string, never>
}

export type Channel = Selectable<ChannelsTable>;
export type ChannelInsert = Insertable<ChannelsTable>;
export type ChannelUpdate = Updateable<ChannelsTable>;

export interface ScheduleItemsTable {
    id: string;
    channelId: string;
    videoId: string;
    startTime: number;
    endTime: number;
}

export type ScheduleItem = Selectable<ScheduleItemsTable>;
export type ScheduleItemInsert = Insertable<ScheduleItem>

export interface UsersTable {
    id: string;
    username: string;
    passwordHash: string;
    salt: string;
}

export type User = Selectable<UsersTable>;
export type UserInsert = Insertable<User>;
