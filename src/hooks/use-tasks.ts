import useLocalStorage from "use-local-storage";
import { TASKS_KEY, TaskState, type Task } from "../models/task";
import React from "react";
import { delay } from "../helpers/utils";

export default function useTasks(){

    const [tasksData] = useLocalStorage<Task[]>(TASKS_KEY, [])
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [isLoadingTasks, setIsLoadingTasks] = React.useState(true)

    async function fetchTasks(){
        if(isLoadingTasks){
            await delay(2000)
            setIsLoadingTasks(false)
        }
        
        setTasks(tasksData)
    }

    React.useEffect(() => {
        fetchTasks()
    }, [tasksData])

    return {
        tasks,
        tasksCounts: tasks.filter((task) => task.state === TaskState.Created).length,
        concludedTasksCount: tasks.filter((task) => task.concluded).length,
        isLoadingTasks
    }

}