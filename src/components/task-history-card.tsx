import React from "react"
import { type Task, TaskRating } from "../models/task"
import taskUseCases from "../useCases/taskUseCases"
import InputRadioButton from "./input-radioButton"
import Text from "./text"
import ButtonIcon from "./button-icon"
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react"
import Undo from "../assets/icons/Undo.svg?react"
import { RatingDisplay } from "./rating-display"



interface TaskHistoryCardProps {
    task: Task,
    loading?: boolean
  }
  
export function TaskHistoryCard({task}:TaskHistoryCardProps){
  
    const ratings = Object.values(TaskRating)
  
    const {updateTaskStatus, updateTaskRating} = taskUseCases()

    const [showRatingSelector, setShowRatingSelector] = React.useState(false);
  
    function handleChangeTaskRating(e: React.ChangeEvent<HTMLInputElement>){
      const rating = e.target.value as Task["rating"] | undefined
  
      if (task.id == null ||rating === undefined || task.concluded === undefined) return
      
      updateTaskRating(task.id, rating)
      updateTaskStatus(task.id, true)

      setShowRatingSelector(false);

    }

  
    return (
    <div className="flex gap-2 items-center min-h-[40px]">
      {task?.concluded === true ? (
        <div className="flex gap-2 shrink-0">
          {ratings
            .filter((rating) => task.rating !== undefined && rating.includes(task.rating))
            .map((rating) => (
              <RatingDisplay key={rating + task.id} status={rating} size="md" />
            ))}
        </div>
      ) : (
        <div className="flex gap-2 shrink-0 p-2 -m-2">
          {!showRatingSelector ? (
            <ButtonIcon 
                icon={PencilIcon} 
                variant="tertiary" 
                onClick={() => setShowRatingSelector(true)}
                size="sm"
            />
          ) : (
            <>
              {ratings.map((rating) => (
                <InputRadioButton
                  key={`history-input-${rating}-${task.id}`}
                  id={`history-input-${rating}-${task.id}`}
                  name={`history-group-${task.id}`}
                  status={rating}
                  value={rating}
                  checked={task.rating === rating}
                  onChange={handleChangeTaskRating}
                />
              ))}
              <ButtonIcon 
                icon={Undo} 
                variant="tertiary" 
                onClick={() => setShowRatingSelector(false)}
                size="sm"
            />
            </>
          ) 
          }
        </div>
      )}

      <Text className="flex-1 min-w-0 break-words">
        {task.title}
      </Text>
    </div>
  );
}