import React from "react";
import { TaskState } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";
import { groupTasksByDay } from "../helpers/utils";
import { TasksDayCard } from "../components/tasks-day-card";

export default function TasksHistoryList(){

    const {tasks} = taskUseCases()

    const groupedTasks = React.useMemo(() => {
        return groupTasksByDay(
            tasks.filter(task => task.state !== TaskState.Creating)
        )
    }, [tasks])
    


    return (
        <section className="space-y-4">
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