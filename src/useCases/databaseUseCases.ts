import 'dexie-export-import'
import { db } from '../db/database'

export const databaseUseCases = {
    exportDatabase: async () => {
        return db.export({
            prettyJson: true,
        })
    },

    importDatabase: async (file: File) => {
        await db.import(file, {
            clearTablesBeforeImport: true
        })
    },

    clearDatabase: async () => {
        await db.delete()
        await db.open()
    }
}