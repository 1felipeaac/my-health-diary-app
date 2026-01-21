import { cx } from "class-variance-authority"
import React from "react"
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
  
    const variant = isEditing ? "tertiary": "secondary"
  
    return(
      <div className="flex gap-2 items-center min-w-0">
  
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
        <div className="flex gap-1">
          <Text 
              className={cx("flex-1 min-w-0 truncate", 
              )}
          >
              {taskTitle}
          </Text>

          {task?.concluded === false &&
          !checked &&
            <ButtonIcon
                icon={PencilIcon} 
                variant={variant}
                onClick={handleEditTask}
                loading={loading}
            />
          }
        </div>
  
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
  
        
      </div>
    )
  }