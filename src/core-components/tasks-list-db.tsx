import Button from "../components/button";
import PlusIcon from "../assets/icons/Plus-Regular.svg?react"
import { TaskState, type Task } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";
import TaskItemDB from "./task-item-db";
import { isSameDay, today } from "../helpers/utils";

export default function TasksListDB(){

    const {addTask, isLoadingTasks, tasks} = taskUseCases()

    function handleNewTask(){
        addTask("")
    }

    const creatingTask = tasks.find(
        (task) => task.state === TaskState.Creating
      )


    const tasksCreatedToday = tasks
    .filter((task) => task.state !== TaskState.Creating)
    .filter((task) => task.createdAt && isSameDay(task.createdAt, today))
    .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0
        return a.createdAt.getTime() - b.createdAt.getTime()
    })

    return (
    <>
        <section>
            <Button 
                icon={PlusIcon} 
                className="w-full"
                onClick={handleNewTask}
                disabled={tasks.some((task) => task.state === TaskState.Creating) || isLoadingTasks}
            >
                Nova Tarefa</Button>
        </section>
        <section className="space-y-2">
            {creatingTask && (
                <TaskItemDB key={creatingTask.id} task={creatingTask} />
            )}
            {tasksCreatedToday.map((task) => (
                <TaskItemDB key={task.id} task={task} />
            ))}
            {isLoadingTasks && <>
                <TaskItemDB task={{} as Task} loading/>
                <TaskItemDB task={{} as Task} loading/>
                <TaskItemDB task={{} as Task} loading/>
                <TaskItemDB task={{} as Task} loading/>
            </>}
        </section>
    </>
    )
}