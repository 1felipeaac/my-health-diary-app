import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";
import TrashIcon from "../assets/icons/Trash-Regular.svg?react"
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react"
import XIcon from "../assets/icons/X-Regular.svg?react"
import Select from "../assets/icons/Select.svg?react"
import CheckIcon from "../assets/icons/Check-Regular.svg?react"
import React from "react";
import InputText from "../components/input-text";
import { TaskRating, TaskState, type Task } from "../models/task";
import { cx } from "class-variance-authority";
import Skeleton from "../components/skeleton";
import InputRadioButton from "../components/input-radioButton";
import taskUseCases from "../useCases/taskUseCases";
import SelectDefault from "../components/select-default";

interface TaskItemProps {
    task: Task,
    loading?: boolean
    readyonly?: boolean
}

export default function TaskItemDB({task, loading, readyonly}:TaskItemProps){
    
    const isReadonly = !!readyonly

    const [isEditing, setIsEditing] = React.useState(
        !isReadonly && task?.state === TaskState.Creating
    )

    const [open, setOpen] = React.useState(false)

    const [taskTitle, setTaskTitle] = React.useState(task.title ||"")

    const {updateTask, updateTaskStatus, updateTaskRating, deleteTask ,isUpdatingTask, isDeletingTask} = taskUseCases()

    const ratings = Object.values(TaskRating)


    function handleEditTask(){
        setIsEditing(true)
    }

    function handleExitEditTask(){

        if (task.id == null) return

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

        if (task.id == null) return

        await updateTask(task.id, taskTitle)
        setIsEditing(false)
    }

    function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>){
        const checked = e.target.checked

        if (task.id == null) return

        updateTaskStatus(task.id ,checked)
    }

    function handleChangeTaskRating(e: React.ChangeEvent<HTMLInputElement>){
        const rating = e.target.value as Task["rating"] | undefined

        if (task.id == null ||rating === undefined) return
        
        updateTaskRating(task.id, rating)

    }

    function handleSelectedDefault(e: React.ChangeEvent<HTMLSelectElement>){
        setTaskTitle(e.target.value)
        setOpen(!open)
    }

    async function handleDeleteTask(){

        if (task.id == null) return

        await deleteTask(task.id)
    }

    React.useEffect(()=>{
        
    },[!task.concluded])


    return (
        <Card size="md">
            
            {open && <SelectDefault onChange={handleSelectedDefault}>
                
                </SelectDefault>}
            {!isEditing ? (
                <div className="flex items-center gap-4">
                    <InputCheckbox
                        checked={!!task?.concluded}
                        onChange={handleChangeTaskStatus}
                        loading={loading}
                        disabled={isReadonly}
                    />
                    {!loading ? <>
                        <Text 
                            className={cx("flex-1", {
                                "line-through": task?.concluded,
                            })}
                        >
                            {taskTitle}
                        </Text>
                        {task?.concluded === true &&
                            <>
                                <div className="flex gap-2.5">
                                {ratings.map((rating) => (
                                    <InputRadioButton 
                                        key={rating+task.id}
                                        id={rating+task.id} 
                                        name={"rating"+task.id} 
                                        status={rating}
                                        value={rating}
                                        checked={task.rating === rating}
                                        onChange={(e) => {
                                            if (isReadonly) return
                                            handleChangeTaskRating(e)
                                          }}
                                        isDisabled={isReadonly}
                                        className="scale-125"
                                    />
                                ))}
                                </div>
                            </>
                        }
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
                    <ButtonIcon variant={"secondary"} icon={Select} onClick={() => setOpen(!open)}/>
                    <InputText 
                        value={taskTitle}
                        className="flex-1" 
                        onChange={handleChangeTaskTitle}
                        required
                        autoFocus
                        isDisabled = {isReadonly}
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