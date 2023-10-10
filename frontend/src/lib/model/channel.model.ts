export type Channel = {
    id: string
    name: string
    thumbnail: string
    description: string
    channelNumber: number
    userId?: string
    randomize: boolean
    shouldRandomizeAt: number
}