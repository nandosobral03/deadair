import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface DeadAirDb {
    video: VideosTable;
    channel: ChannelsTable;
    videoChannel: VideoChannelTable;
    schedule_item: ScheduleItemsTable;
    user: UsersTable;
    image: ImageTable;
    sharedChannel: SharedChannelTable;
}



export interface VideosTable {
    id: string
    title: string;
    thumbnail: string;
    duration: number;
    category: string;
    youtubeChannel: string;

}

export interface VideoChannelTable {
    videoId: string;
    channelId: string;
    userId: string | null;
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
    randomize: number;
    shouldRandomizeAfter: number;
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
    passwordHash: string | null;
    salt: string | null;
    isAdmin: 0 | 1;
}

export type User = Selectable<UsersTable>;
export type UserInsert = Insertable<User>;


export interface SharedChannelTable {
    channelId: string;
    userId: string;
    createdAt: number;
}