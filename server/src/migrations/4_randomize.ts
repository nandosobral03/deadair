import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

    await db.schema.alterTable('channel').addColumn("randomize", "numeric", (col) => col.notNull().defaultTo(0)).execute()
    await db.schema.alterTable('channel').addColumn("shouldRandomizeAfter", "numeric", (col) => col.notNull().defaultTo(0)).execute()

}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.alterTable('channel').dropColumn("randomize").execute()
}