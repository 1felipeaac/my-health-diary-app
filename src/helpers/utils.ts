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

function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day)
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

export function formatDateShort(dateInput: string | Date) {
  const date =
    dateInput instanceof Date
      ? dateInput
      : parseLocalDate(dateInput)

  if (isNaN(date.getTime())) return ""

  let weekday = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long"
  }).format(date)

  weekday = weekday.replace("-feira", "")

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)

  return `${weekday}, ${day}/${month}/${year}`
}

export function groupTasksByDay(tasks: Task[]) {
    return tasks.reduce((acc, task) => {
    if (!task.createdAt) return acc

    const d = task.createdAt
    const key = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0"),
    ].join("-")

    acc[key] = acc[key] ?? []
    acc[key].push(task)

    return acc
  }, {} as Record<string, Task[]>)
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
  const startOfThisWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const day = startOfThisWeek.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  startOfThisWeek.setDate(startOfThisWeek.getDate() + mondayOffset)

  const startOfThatWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  )

  const thatDay = startOfThatWeek.getDay()
  const thatMondayOffset = thatDay === 0 ? -6 : 1 - thatDay
  startOfThatWeek.setDate(startOfThatWeek.getDate() + thatMondayOffset)

  const diff =
    startOfThisWeek.getTime() - startOfThatWeek.getTime()

  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000))
}
