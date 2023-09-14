import { FileMigrationProvider, Migrator } from "kysely"
import { db } from "./database/db"
import { promises as fs } from 'fs'
import * as path from 'path'

const pathToMigrationsFolder = "/migrations"

const params = process.argv.slice(2)
if (params.length !== 1) {
    console.error("Usage: npm run migrate -- <up|down>")
    process.exit(1)
}

const runMigrations = async () => {
    const migrator = new Migrator({
        db: db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(__dirname, pathToMigrationsFolder),
        }),
    })
    console.log("Folder contents")
    console.log(await fs.readdir(path.join(__dirname, pathToMigrationsFolder)))
    if (params[0] === "down") {
        console.log("Rolling back migrations...")
        await migrator.migrateDown()
    }
    else {
        console.log("Applying migrations...")
        await migrator.migrateToLatest()
    }
}

runMigrations()