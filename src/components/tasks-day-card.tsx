import TaskCard from "../core-components/task-card"
import type { Task } from "../models/task"
import Card from "./card"
import Text from "./text";
import { formatDate } from "../helpers/utils";

interface TasksDayCardProps {
    date: string
    tasks: Task[]
    readonly?: boolean
  }
  
  export function TasksDayCard({ date, tasks, readonly }: TasksDayCardProps) {
    return (
      <Card size="lg" className="space-y-3">
        <Text variant="body-sm-bold" className="text-gray-400">
          {formatDate(date)}
        </Text>
  
        <div className="space-y-2">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              readonly={readonly}
            />
          ))}
        </div>
      </Card>
    )
  }
  