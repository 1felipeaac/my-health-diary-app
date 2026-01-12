import Dexie, {type Table} from 'dexie'
import type { Task } from '../models/task'

export class AppDatabase extends Dexie {
    tasks!: Table<Task, string>

    constructor(){
        super('task_db')

        this.version(1).stores({
            tasks: 'id, title, concluded, state, rating, createdAt'
        })
    }
}

export const db = new AppDatabase()