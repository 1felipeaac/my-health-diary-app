import {db} from '../db/database'
import { TaskRating, type Task, TaskState } from '../models/task'

export class TaskRepository{
    async create(task: Omit<Task, 'id' | 'createdAt'>){
        return db.tasks.add({
            ...task,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date()
        })
    }

    async findAll() {
        return db.tasks
          .orderBy('createdAt')
          .reverse()
          .toArray()
      }

    async updateTask(id: string, title: string){
        return db.tasks.update(id, {title, state: TaskState.Created})
    }
    async toggleCompleted(id: string, concluded: boolean){
        return db.tasks.update(id, {concluded})
    }

    async toggleRating(id: string, rating: TaskRating){
        return db.tasks.update(id, {rating})
    }

    async delete(id: string) {
        return db.tasks.delete(id)
      }

    async tasksCount(){
        return db.tasks.filter((task) => task.state === TaskState.Created).count()
    }
    async concludedTasksCount(){
        return db.tasks.filter((task) => task.concluded !== undefined).count()
    }
}