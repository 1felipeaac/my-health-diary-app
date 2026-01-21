import { cx } from "class-variance-authority"
import React from "react"
import { type Task, TaskRating } from "../models/task"
import taskUseCases from "../useCases/taskUseCases"
import InputRadioButton from "./input-radioButton"
import Text from "./text"
interface TaskHistoryCardProps {
    task: Task,
    loading?: boolean
  }
  
export function TaskHistoryCard({task}:TaskHistoryCardProps){
  
    const ratings = Object.values(TaskRating)
  
    const {updateTaskStatus, updateTaskRating} = taskUseCases()
  
    const [taskTitle] = React.useState(task.title || "")
  
    function handleChangeTaskRating(e: React.ChangeEvent<HTMLInputElement>){
      const rating = e.target.value as Task["rating"] | undefined
  
      if (task.id == null ||rating === undefined || task.concluded === undefined) return
      
      updateTaskRating(task.id, rating)
      updateTaskStatus(task.id, true)

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
                  />
              ))}
              </div>
        }
        <Text 
            className={cx("flex flex-1", 
            )}
        >
            {taskTitle}
        </Text>
  
      </div>
    )
  }