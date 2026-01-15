import Card from "../components/card";
import Text from "../components/text";
import React from "react";
import { TaskRating, type Task } from "../models/task";
import { cva, cx } from "class-variance-authority";
import Skeleton from "../components/skeleton";
import InputRadioButton from "../components/input-radioButton";
import Icon from "../components/icon";
import Check from "../assets/icons/CheckSquare-Fill.svg?react"

interface TaskItemProps {
    task: Task,
    loading?: boolean
    readonly?: boolean
}

export const iconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "fill-pink-base"
        },
        size: {
            md: "w-5 h-5"
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

export default function TaskCard({task, loading, readonly}:TaskItemProps){
    
    const isReadonly = !!readonly

    const [taskTitle] = React.useState(task.title || "")

    const ratings = Object.values(TaskRating)

    return (
        <Card size="md">
            {(
                <div className="flex items-center gap-4">
                    
                    {!loading ? <>
                        <Icon svg={Check} className={iconVariants({})}/>
                        <Text 
                            className={cx("flex-1", 
                            )}
                        >
                            {taskTitle}
                        </Text>
                        {task?.concluded === true &&
                            <>
                                <div style={{display: 'flex', gap: '.25rem'}}>
                                {ratings.filter((rating)=> task.rating !== undefined && rating.includes(task.rating)).map((rating) => (
                                    <InputRadioButton 
                                        key={rating+task.id}
                                        id={rating+task.id} 
                                        name={"rating"+task.id} 
                                        status={rating}
                                        value={rating}
                                        checked={task.rating === rating}
                                        onChange={() => {}}
                                        isDisabled={isReadonly}
                                    />
                                ))}
                                </div>
                            </>
                        }
                    </>  : 
                    <Skeleton className="flex-1 h-6"/>}
                </div>
            )}
        </Card>
    )
}