import React from "react";
import { TaskState } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";
import { getWeekIndexFromDate, getWeekRange, groupTasksByDay } from "../helpers/utils";
import { TasksDayCard } from "../components/tasks-day-card";
import { NavLink } from "react-router";
import Icon from "../components/icon";
import Text from "../components/text";
import ArrowLeft from "../assets/icons/Arrow-Left.svg?react"
import ArrowCircleRight from "../assets/icons/Arrow-Circle-Right.svg?react"
import ArrowCircleLeft from "../assets/icons/Arrow-Circle-Left.svg?react"
import { buttonIconVariants } from "../components/input-file";
import ButtonIcon from "../components/button-icon";
import { cva } from "class-variance-authority";

export const arrowsIconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "fill-pink-base"
        },
        size: {
            md: "w-10 h-10 md:w-13 md:h-13"
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

export default function TasksWeekList(){

    const {tasks} = taskUseCases()

    const [weekOffset, setWeekOffset] = React.useState(0)
      

    const minWeekOffset = React.useMemo(() => {
    if (tasks.length === 0) return 0

    const oldestTask = tasks
        .filter(t => t.createdAt)
        .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime())[0]

    if (!oldestTask?.createdAt) return 0

    return getWeekIndexFromDate(oldestTask.createdAt)
    }, [tasks])

    const weeklyTasks = React.useMemo(() => {
        const { start, end } = getWeekRange(weekOffset)

        return tasks.filter(task => {
            if (!task.createdAt) return false
            return task.createdAt >= start && task.createdAt <= end
        })
    }, [tasks, weekOffset])

    const groupedTasks = React.useMemo(() => {
        return groupTasksByDay(
            weeklyTasks
            .filter(task => task.state !== TaskState.Creating)
            .sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0
                return a.createdAt.getTime() - b.createdAt.getTime()
            })
        )
    }, [weeklyTasks])
    


    return (
        <section className="space-y-4">
        <NavLink to={"/"} className={"flex items-center justify-start gap-1.5"}>
                <Icon svg={ArrowLeft} className={buttonIconVariants()}/>
                <Text variant={"body-sm-bold"}>
                    Tarefas
                </Text>
            </NavLink>
        <div className="flex gap-2">        
        </div>
        {Object.entries(groupedTasks).map(([date, tasks]) => (
          <TasksDayCard
            key={date}
            date={date}
            tasks={tasks}
            readonly
          />
        ))}
        <div className="flex items-center justify-around">

            <ButtonIcon
                onClick={() => setWeekOffset(w => w + 1)}
                disabled={weekOffset >= minWeekOffset}
                icon={ArrowCircleLeft}
                variant={"quaternary"}
                style={{width: '4rem', height: '4rem'}}
            />


            <ButtonIcon
                disabled={weekOffset === 0}
                onClick={() => setWeekOffset(w => w - 1)}
                icon={ArrowCircleRight}
                style={{width: '4rem', height: '4rem'}}
                variant={"quaternary"}
            />
        </div>
      </section>
    )
}