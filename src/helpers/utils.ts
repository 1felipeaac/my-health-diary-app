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

export function formatDateFromDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}


export function formatDate(date: string){
  const [year, month, day] = date.split('-').map(Number)
    return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
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

export function capitalizeWords(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function getWeekRange(offset = 0) {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay() - offset * 7)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

export function getWeekIndexFromDate(date: Date) {
  const startOfThisWeek = new Date()
  startOfThisWeek.setHours(0, 0, 0, 0)
  startOfThisWeek.setDate(
    startOfThisWeek.getDate() - startOfThisWeek.getDay()
  )

  const startOfThatWeek = new Date(date)
  startOfThatWeek.setHours(0, 0, 0, 0)
  startOfThatWeek.setDate(
    startOfThatWeek.getDate() - startOfThatWeek.getDay()
  )

  const diff =
    startOfThisWeek.getTime() - startOfThatWeek.getTime()

  return Math.round(diff / (7 * 24 * 60 * 60 * 1000))
}