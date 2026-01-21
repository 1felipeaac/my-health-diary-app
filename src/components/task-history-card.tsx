import { cx } from "class-variance-authority"
import React from "react"
import { type Task, TaskRating } from "../models/task"
import taskUseCases from "../useCases/taskUseCases"
import ButtonIcon from "./button-icon"
import InputRadioButton from "./input-radioButton"
import Text from "./text"
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react"
interface TaskHistoryCardProps {
    task: Task,
    loading?: boolean
  }
  
export function TaskHistoryCard({task, loading}:TaskHistoryCardProps){
  
    const ratings = Object.values(TaskRating)
  
    const {updateTaskStatus, updateTaskRating} = taskUseCases()
  
    const [taskTitle] = React.useState(task.title || "")
  
    const [isEditing, setIsEditing] = React.useState(false)
  
    function handleEditTask(){
        setIsEditing(prev => !prev)
    }
  
    function handleChangeTaskRating(e: React.ChangeEvent<HTMLInputElement>){
      const rating = e.target.value as Task["rating"] | undefined
  
      if (task.id == null ||rating === undefined || task.concluded === undefined) return
      
      updateTaskRating(task.id, rating)
      updateTaskStatus(task.id, true)

      handleEditTask()
  
    }


  
    return(
      <div className="flex gap-2 items-center">
  
        {task?.concluded === true ?
  
            <div className="flex gap-2">
            {ratings.filter(
                (rating)=> task.rating !== undefined && 
                rating.includes(task.rating)).map((rating) => (
                <InputRadioButton 
                    key={rating+task.id}
                    id={rating+task.id} 
                    name={"rating"+task.id} 
                    status={rating}
                    value={rating}
                    checked={task.rating === rating}
                    onChange={() => {}}
                    isDisabled={true}
                />
            ))}
            </div> :
              <ButtonIcon
                icon={PencilIcon}
                variant="tertiary"
                onClick={handleEditTask}
                loading={loading}
                size={"xsm"}
              />
        }
        <Text 
            className={cx("flex flex-1", 
            )}
        >
            {taskTitle}
        </Text>
  
        {task && task.concluded === false && isEditing === true &&
            <>
                <div className="flex gap-1">
                {ratings.map((rating) => (
                    <InputRadioButton 
                        key={rating+task.id}
                        id={rating+task.id} 
                        name={"rating"+task.id} 
                        status={rating}
                        value={rating}
                        checked={task.rating === rating}
                        onChange={(e) => {
                            handleChangeTaskRating(e)
                          }}
                        isDisabled={isEditing}
                    />
                ))}
                </div>
            </>
        }
  
        {/* {task && task.concluded === false &&
          <ButtonIcon
              icon={PencilIcon} 
              variant={variant}
              onClick={handleEditTask}
              loading={loading}
          />
        } */}
      </div>
    )
  }