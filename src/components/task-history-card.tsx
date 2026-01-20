import { cx } from "class-variance-authority"
import React from "react"
import { isSameDay, today } from "../helpers/utils"
import { type Task, TaskRating } from "../models/task"
import taskUseCases from "../useCases/taskUseCases"
import ButtonIcon from "./button-icon"
import InputCheckbox from "./input-checkbox"
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
  
    const [checked, setChecked] = React.useState(false)
  
    function handleEditTask(){
        setIsEditing(prev => !prev)
    }
  
    function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>){
      setChecked(e.target.checked)
    }
  
    function handleChangeTaskRating(e: React.ChangeEvent<HTMLInputElement>){
      const rating = e.target.value as Task["rating"] | undefined
  
      if (task.id == null ||rating === undefined) return
      
      updateTaskRating(task.id, rating)
      updateTaskStatus(task.id, checked)
  
    }
  
    const variant = isEditing ? "secondary": "tertiary"
  
    return(
      <div className="flex space-x-2 items-center m-0">
  
        {task?.concluded === true ?
  
            <div style={{display: 'flex', gap: '.25rem'}}>
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
              <InputCheckbox
                  checked={checked}
                  onChange={(e) =>{
                    if (!isEditing) return
                    handleChangeTaskStatus(e)
                  }
                }
                  loading={loading}
                  disabled={!isEditing}
              />
              
  
        }
        <Text 
            className={cx("flex-1", 
            )}
        >
            {taskTitle}
        </Text>
  
        {checked === true && task?.concluded === false &&
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
  
        {task?.concluded === false && 
          task?.createdAt && !checked &&
          !isSameDay(task?.createdAt, today) && 
          <ButtonIcon 
              icon={PencilIcon} 
              variant={variant}
              onClick={handleEditTask}
              loading={loading}
          />
        }
      </div>
    )
  }