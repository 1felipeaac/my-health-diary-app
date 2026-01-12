import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";
import TrashIcon from "../assets/icons/Trash-Regular.svg?react"
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react"
import XIcon from "../assets/icons/X-Regular.svg?react"
import CheckIcon from "../assets/icons/Check-Regular.svg?react"
import React from "react";
import InputText from "../components/input-text";
import { TaskRating, TaskState, type Task } from "../models/task";
import { cx } from "class-variance-authority";
import useTask from "../hooks/use-task";
import Skeleton from "../components/skeleton";
import InputRadioButton from "../components/input-radiobutton";

interface TaskItemProps {
    task: Task,
    loading?: boolean
}

export default function TaskItem({task, loading}:TaskItemProps){

    const [isEditing, setIsEditing] = React.useState(
        task?.state === TaskState.Creating
    )

    const [taskTitle, setTaskTitle] = React.useState(task.title || "")

    const {updateTask, updateTaskStatus, updateTaskRating, deleteTask, isUpdatingTask, isDeletingTask} = useTask()

    const ratings = Object.values(TaskRating)

    function handleEditTask(){
        setIsEditing(true)
    }

    function handleExitEditTask(){

        if(task.state === TaskState.Creating){
            deleteTask(task.id)
        }

        setIsEditing(false)
    }

    function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>){
        setTaskTitle(e.target.value || "")
    }

    async function handleSaveTask(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        await updateTask(task.id, {title: taskTitle})
        setIsEditing(false)
    }

    function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>){
        const checked = e.target.checked

        updateTaskStatus(task.id ,checked)
    }

    function handleChangeTaskRating(e: React.ChangeEvent<HTMLInputElement>){
        const rating = e.target.value as Task["rating"] | undefined

        if (rating === undefined) return

        updateTaskRating(task.id, rating)
    }

    async function handleDeleteTask(){
        await deleteTask(task.id)
    }

    return (
        <Card size="md">
            {!isEditing ? (
                <div className="flex items-center gap-4">
                    <InputCheckbox
                        checked={!!task?.concluded}
                        onChange={handleChangeTaskStatus}
                        loading={loading}
                    />
                    {!loading ? <>
                        <Text 
                            className={cx("flex-1", {
                                "line-through": task?.concluded,
                            })}
                        >
                            {task.title}
                        </Text>
                        {task?.concluded === true &&
                        <div style={{display: 'flex', gap: '.25rem'}}>
                            {ratings.map((rating) => (
                                <InputRadioButton 
                                    key={rating+task.id}
                                    id={rating+task.id} 
                                    name={"rating"+task.id} 
                                    status={rating}
                                    value={rating}
                                    onChange={handleChangeTaskRating}
                                />
                            ))}
                        </div>}
                    </>  : 
                    <Skeleton className="flex-1 h-6"/>}
                    <div className="flex gap-1">
                        <ButtonIcon 
                            icon={TrashIcon} 
                            variant="tertiary"
                            onClick={handleDeleteTask}
                            loading={loading}
                            handling={isDeletingTask}
                        />
                        <ButtonIcon 
                            icon={PencilIcon} 
                            variant="tertiary"
                            onClick={handleEditTask}
                            loading={loading}
                        />
                    </div>
                </div>
            ): (
                <form 
                    onSubmit={handleSaveTask}
                    className="flex items-center gap-4"
                >
                    <InputText 
                        value={taskTitle}
                        className="flex-1" 
                        onChange={handleChangeTaskTitle}
                        required
                        autoFocus
                    />
                    <div className="flex gap-1">
                        <ButtonIcon 
                            type="button"
                            icon={XIcon} 
                            variant="secondary" 
                            onClick={handleExitEditTask}
                            
                        />
                        <ButtonIcon 
                            type="submit"
                            icon={CheckIcon} 
                            variant="primary"
                            handling={isUpdatingTask}
                        />
                    </div>
                </form>
            )}
        </Card>
    )
}