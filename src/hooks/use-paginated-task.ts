import React from "react"
import type { Task } from "../models/task"
import taskUseCases from "../useCases/taskUseCases"


const PAGE_SIZE = 7

export function usePaginatedTasks() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [page, setPage] = React.useState(1)
  const [total, setTotal] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

  const {fetchPaginated, countTasks} = taskUseCases()

  async function loadPage(pageNumber: number) {
    setIsLoading(true)

    const [data, count] = await Promise.all([
      fetchPaginated(pageNumber, PAGE_SIZE),
      countTasks()
    ])

    setTasks(data)
    setTotal(count)
    setIsLoading(false)
  }

  React.useEffect(() => {
    loadPage(page)
  }, [page])

  return {
    tasks,
    page,
    setPage,
    isLoading,
    hasNext: page * PAGE_SIZE < total,
    hasPrev: page > 1
  }
}
