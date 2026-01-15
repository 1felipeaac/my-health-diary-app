import type { Task } from "../models/task"

export function delay(ms: number){
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isSameDay(a: Date, b: Date){
    return(
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

export const today = new Date()

export function formatDate(date: string){
    return new Date(date).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
}

export function groupTasksByDay(tasks: Task[]) {
    return tasks.reduce<Record<string, Task[]>>((acc, task) => {
      if (!task.createdAt) return acc
  
      const dateKey = task.createdAt.toISOString().split('T')[0] // YYYY-MM-DD
  
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
  
      acc[dateKey].push(task)
  
      return acc
    }, {})
  }