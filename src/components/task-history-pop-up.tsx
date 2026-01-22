import { cx } from "class-variance-authority";
import React from "react";
import { type Task, TaskRating } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";
import InputRadioButton from "./input-radioButton";
import Icon from "./icon";
import Text from "./text";
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react"
import X_Icon from "../assets/icons/X-Regular.svg?react"

interface TaskHistoryPopUpProps {
  task: Task,
  loading?: boolean
}
export function TaskHistoryPopUp({ task }: TaskHistoryPopUpProps) {
  const [isEditingRating, setIsEditingRating] = React.useState(false);
  const ratings = Object.values(TaskRating); // Ex: ['good', 'average', 'bad']
  const { updateTaskStatus, updateTaskRating } = taskUseCases();

  function handleChangeTaskRating(e: React.ChangeEvent<HTMLInputElement>) {
    const rating = e.target.value as Task["rating"] | undefined;
    if (task.id == null || rating === undefined) return;

    updateTaskRating(task.id, rating);
    updateTaskStatus(task.id, true);
    
    setTimeout(() => setIsEditingRating(false), 300);
  }


  const ratingColors: Record<string, string> = {
    good: "border-green-base bg-green-50",
    average: "border-yellow-base bg-yellow-50",
    bad: "border-red-base bg-red-50",
    none: "border-gray-200 bg-white"
  };

  return (
    <div className="relative group w-full">
      {isEditingRating && (
        <>
          <div 
            className="fixed inset-0 z-[60] bg-black/10 backdrop-blur-[1px]" 
            onClick={() => setIsEditingRating(false)} 
          />
          
          <div className={cx(
            `absolute left-0 -top-16 z-[70] flex items-center justify-between
             gap-3 p-3 rounded-xl border-2 shadow-2xl transition-all 
             duration-300 animate-in fade-in slide-in-from-bottom-2 w-full
            `,
            ratingColors[task.rating || "none"]
          )}>
            <div className="flex flex-col mr-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                Avaliar
              </span>
            </div>

            <div className="flex gap-3 items-center bg-white/50 p-2 rounded-lg">
              {ratings.map((rating) => (
                <div key={"box-" + rating} className="flex flex-col items-center gap-1">
                  <InputRadioButton
                    id={"pop-hist-" + rating + task.id}
                    name={"pop-rating-hist-" + task.id}
                    status={rating}
                    value={rating}
                    checked={task.rating === rating}
                    onChange={handleChangeTaskRating}
                    className="scale-125" 
                  />

                  <span className={cx(
                    "text-[8px] font-bold uppercase",
                    rating === 'good' && "text-green-dark",
                    rating === 'average' && "text-yellow-dark",
                    rating === 'bad' && "text-red-dark",
                  )}/>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsEditingRating(false)}
              className="ml-2 p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <Icon svg={X_Icon} className="w-4 h-4 text-gray-400" />
            </button>

            <div className={cx(
              "absolute -bottom-2 left-6 w-4 h-4 rotate-45 border-r-2 border-b-2",
              ratingColors[task.rating || "none"]
            )} />
          </div>
        </>
      )}

      <div 
        onClick={() => !task.concluded && setIsEditingRating(true)}
        className={cx(
          "flex items-center gap-4 p-3 rounded-lg border border-transparent transition-all cursor-pointer",
          isEditingRating ? "bg-white shadow-md border-gray-100 scale-[1.01]" : "hover:bg-gray-50"
        )}
      >
        <div className="flex shrink-0">
        
            <div className={cx(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                task.rating ? ratingColors[task.rating].split(' ')[0] : "border-gray-300 border"
            )}>
                {task.rating ? (
                    <div className={cx("w-3 h-3 rounded-full", task.rating === 'good' ? 
                    'bg-green-base' : task.rating === 'average' ? 
                    'bg-yellow-base' : 'bg-red-base')} />
                ) : (
                    <Icon svg={PencilIcon} className="w-3 h-3 text-gray-300" />
                )}
            </div>
        </div>

        <Text className={cx(
          "flex-1 min-w-0 break-words font-medium",
          task.concluded ? "text-gray-400" : "text-gray-700"
        )}>
          {task.title}
        </Text>

      </div>
    </div>
  );
}