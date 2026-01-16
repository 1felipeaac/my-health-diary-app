import React from "react";
import { TaskState } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";
import { groupTasksByDay } from "../helpers/utils";
import { TasksDayCard } from "../components/tasks-day-card";
import { NavLink } from "react-router";
import Icon from "../components/icon";
import Text from "../components/text";
import ArrowLeft from "../assets/icons/Arrow-Left.svg?react"
import { buttonIconVariants } from "../components/input-file";

export default function TasksHistoryList(){

    const {tasks} = taskUseCases()

    const groupedTasks = React.useMemo(() => {
        return groupTasksByDay(
            tasks
                .filter(task => task.state !== TaskState.Creating)
                .sort((a, b) => {
                    if (!a.createdAt || !b.createdAt) return 0
                    return a.createdAt.getTime() - b.createdAt.getTime()
                  })
        )
    }, [tasks])
    


    return (
        <section className="space-y-4">
        <NavLink to={"/"} className={"flex items-center justify-start gap-1.5"}>
                <Icon svg={ArrowLeft} className={buttonIconVariants()}/>
                <Text variant={"body-sm-bold"}>
                    Tarefas
                </Text>
            </NavLink>
        {Object.entries(groupedTasks).map(([date, tasks]) => (
          <TasksDayCard
            key={date}
            date={date}
            tasks={tasks}
            readonly
          />
        ))}
      </section>
    )
}