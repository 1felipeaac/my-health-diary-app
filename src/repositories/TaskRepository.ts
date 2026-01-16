import Dexie from 'dexie'
import {db} from '../db/database'
import { TaskRating, type Task, TaskState } from '../models/task'

export class TaskRepository{
    async create(task: Omit<Task, 'id' | 'createdAt'>){
        return db.tasks_v2.add({
            ...task,
            createdAt: new Date()
        })
    }

    async findAll() {
        return db.tasks_v2
          .orderBy('createdAt')
          .reverse()
          .toArray()
    }

    async updateTask(id: number, title: string){
        return db.tasks_v2.update(id, {title, state: TaskState.Created})
    }
    async toggleCompleted(id: number, concluded: boolean){
        return db.tasks_v2.update(id, {concluded})
    }

    async toggleRating(id: number, rating: TaskRating){
        return db.tasks_v2.update(id, {rating})
    }

    async delete(id: number) {
        return db.tasks_v2.delete(id)
    }

    async tasksCount(){
        return db.tasks_v2.filter((task) => task.state === TaskState.Created).count()
    }

    async concludedTasksCount(){
        return db.tasks_v2.filter((task) => task.concluded !== undefined).count()
    }

    async listPaginated(page: number, pageSize: number) {
        const offset = (page - 1) * pageSize
      
        return db.tasks_v2
          .where('[state+createdAt]')
          .between(
            [TaskState.Created, Dexie.minKey],
            [TaskState.Created, Dexie.maxKey]
          )
          .offset(offset)
          .limit(pageSize)
          .toArray()
      }
    
      async countAll() {
        return db.tasks_v2
          .where('state')
          .notEqual(TaskState.Creating)
          .count()
      }
    }