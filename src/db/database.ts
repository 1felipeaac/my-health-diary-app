import Dexie, {type Table} from 'dexie'
import type { Task } from '../models/task'

export class AppDatabase extends Dexie {
    tasks!: Table<Task, number>
    tasks_v2!: Table<Task, number>
  
    constructor() {
      super('task_db')
  
      this.version(1).stores({
        tasks: 'id, title, concluded, state, rating, createdAt'
      })
  
      this.version(2).stores({
        tasks: 'id, title, concluded, state, rating, createdAt',
        tasks_v2: '++id, state, createdAt'
      })
  
      this.version(3).stores({
        tasks_v2: '++id, state, createdAt, [state+createdAt]'
      })
  
      this.version(4).stores({
        tasks: null,
        tasks_v2: '++id, state, createdAt, [state+createdAt]'
      })
    }
  }
  
  export const db = new AppDatabase()