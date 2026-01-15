import React from "react";
import { TaskState, type TaskRating, type Task } from "../models/task";
import { TaskRepository } from "../repositories/TaskRepository";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import { isSameDay, today } from "../helpers/utils";

const repository = new TaskRepository()


export default function taskUseCases(){

    const [isUpdatingTask, setIsUpdatingTask] = React.useState(false)
    const [isDeletingTask, setIsDeletingTask] = React.useState(false)
    
    const tasks = useLiveQuery(()=> db.tasks.toArray(), [], [])
    const isLoadingTasks = !tasks

    async function addTask(
        title: string
    ){
        await repository.create({
            title,
            state: TaskState.Creating
        })
    }

    async function updateTask(id: string, title: Task["title"]) {
        setIsUpdatingTask(true)
        await repository.updateTask(id, title)
        setIsUpdatingTask(false)
    }

    async function updateTaskStatus(id: string, concluded: boolean) {
        await repository.toggleCompleted(id, concluded)
    }

    async function updateTaskRating (id: string, rating: TaskRating){
        await repository.toggleRating(id, rating)
    }

    async function deleteTask (id: string) {
        setIsDeletingTask(true)
        await repository.delete(id)
        setIsDeletingTask(false)
    }

    async function findAll(){
        return await repository.findAll()
    }

    const todaysTasksCounts = tasks
        ?.filter(task => task.state === TaskState.Created)
        ?.filter(task => task.createdAt && isSameDay(task.createdAt, today))
        .length ?? 0

    const todaysConcludedTasksCount = tasks
        ?.filter(task => task.concluded)
        ?.filter(task => task.createdAt && isSameDay(task.createdAt, today))
        .length ?? 0

    const totalTasksCounts = tasks
        ?.filter(task => task.state === TaskState.Created)
        .length ?? 0

    const totalConcludedTasksCount = tasks
        ?.filter(task => task.concluded)
        .length ?? 0

    return {
        addTask,
        updateTask,
        updateTaskStatus,
        updateTaskRating,
        deleteTask,
        findAll,
        todaysTasksCounts,
        todaysConcludedTasksCount,
        totalTasksCounts,
        totalConcludedTasksCount,
        tasks,
        isUpdatingTask,
        isDeletingTask,
        isLoadingTasks
    }


}