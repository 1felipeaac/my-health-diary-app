import { usePaginatedTasks } from "../hooks/use-paginated-task";
import Skeleton from "../components/skeleton";
import TaskCard from "./task-card";

export default function TasksListPaginated(){

  const {
    tasks,
    page,
    setPage,
    isLoading,
    hasNext,
    hasPrev
  } = usePaginatedTasks()
    


  return (
    <>
      <section className="space-y-2">
        {isLoading && <Skeleton className="h-20" />}

        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            readonly
          />
        ))}
      </section>

      <footer className="flex justify-between mt-4">
        <button disabled={!hasPrev} onClick={() => setPage(p => p - 1)}>
          Anterior
        </button>

        <span>Página {page}</span>

        <button disabled={!hasNext} onClick={() => setPage(p => p + 1)}>
          Próxima
        </button>
      </footer>
    </>
  )
}