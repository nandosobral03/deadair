import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

    await db.schema.createTable('sharedChannel')
        .addColumn("channelId", "text", (col) => col.notNull().references("channel.id").onDelete("cascade"))
        .addColumn("userId", "text", (col) => col.notNull().references("user.id").onDelete("cascade"))
        .addColumn("createdAt", "integer", (col) => col.notNull())
        .execute()

}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('sharedChannel').execute()
}