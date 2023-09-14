import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

    await db.schema
        .createTable('user')
        .addColumn('id', 'text', (col) => col.primaryKey().notNull())
        .addColumn('username', 'text', (col) => col.notNull())
        .addColumn('passwordHash', 'text', (col) => col.notNull())
        .addColumn('salt', 'text', (col) => col.notNull())
        .execute()

    await db.schema
        .createTable('channel')
        .addColumn('id', 'text', (col) => col.notNull().primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('thumbnail', 'text', (col) => col.notNull())
        .addColumn('description', 'text', (col) => col.notNull())
        .addColumn('channelNumber', 'integer', (col) => col.notNull())
        .addColumn('userId', 'text', (col) => col.references('user.id'))
        .addColumn('createdAt', 'text', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .execute()

    await db.schema
        .createTable('video')
        .addColumn('id', 'text', (col) => col.notNull().primaryKey())
        .addColumn('title', 'text', (col) => col.notNull())
        .addColumn('thumbnail', 'text', (col) => col.notNull())
        .addColumn('duration', 'integer', (col) => col.notNull())
        .addColumn('category', 'text', (col) => col.notNull())
        .execute()

    await db.schema
        .createTable('videoChannel')
        .addColumn('videoId', 'text', (col) => col.references('video.id'))
        .addColumn('channelId', 'text', (col) => col.references('channel.id'))
        .execute()


    await db.schema
        .createTable('schedule_item')
        .addColumn('id', 'text', (col) => col.notNull().primaryKey())
        .addColumn('channelId', 'text', (col) => col.references('channel.id'))
        .addColumn('videoId', 'text', (col) => col.references('video.id'))
        .addColumn('startTime', 'integer', (col) => col.notNull())
        .addColumn('endTime', 'integer', (col) => col.notNull())
        .execute()
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('schedule_item').execute()
    await db.schema.dropTable('video').execute()
    await db.schema.dropTable('channel').execute()
    await db.schema.dropTable('user').execute()
}