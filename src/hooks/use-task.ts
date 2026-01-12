import useLocalStorage from "use-local-storage";
import { TaskRating, TASKS_KEY, TaskState, type Task } from "../models/task";
import React from "react";
import { delay } from "../helpers/utils";


export default function useTask(){
    const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, [])
    const [isUpdatingTask, setIsUpdatingTask] = React.useState(false)
    const [isDeletingTask, setIsDeletingTask] = React.useState(false)

    function prepareTask(){
        setTasks([...tasks, {
            id: Math.random().toString(36).substring(2, 9),
            title: "",
            state: TaskState.Creating
        }])
    }

    async function updateTask(id: string, payload: {title: Task["title"]}){
        setIsUpdatingTask(true)
        await delay(1000)
        setTasks(
            tasks.map(
                (task) => 
                    task.id === id ? {
                        ...task, state: TaskState.Created, ...payload
                    } : task
            )
        )
        setIsUpdatingTask(false)
    }

    function updateTaskStatus(id: string, concluded: boolean){
        
        setTasks(
            tasks.map((task) => task.id === id ? {...task, concluded} : task)
        )
        
    }

    function updateTaskRating(id: string, rating: TaskRating){
        
        setTasks(
            tasks.map((task) => task.id === id ? {...task, rating} : task)
        )
        
    }

    async function deleteTask(id: string){
        setIsDeletingTask(true)
        await delay(1000)
        setTasks(tasks.filter((task) => task.id !== id))
        setIsDeletingTask(false)
    }

    return {
        prepareTask, 
        updateTask,
        updateTaskStatus,
        updateTaskRating,
        deleteTask,
        isUpdatingTask,
        isDeletingTask
    }
}