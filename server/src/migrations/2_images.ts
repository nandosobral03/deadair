import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

    await db.schema.createTable('image')
        .addColumn('id', 'text', (col) => col.primaryKey().notNull())
        .addColumn('url', 'text', (col) => col.notNull().unique())
        .addColumn("deleteHash", "text", (col) => col.notNull().unique())
        .addColumn('createdAt', 'integer', (col) => col.notNull())
        .execute()
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('image').execute()
}