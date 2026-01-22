import { type Task } from "../models/task"
import Card from "./card"
import Text from "./text";
import { capitalizeWords, formatDateShort} from "../helpers/utils";

import { TaskHistoryPopUp } from "./task-history-pop-up";


interface TasksDayCardProps {
    date: string
    tasks: Task[]
  }
  
  export function TasksDayCard({ date, tasks}: TasksDayCardProps) {

    const data = formatDateShort(date)

    return (
      <Card size="sm" className="space-y-3">
        <Text variant="body-sm-bold" className="text-gray-400 flex justify-center border-b-1 border-pink-light">
          {capitalizeWords(data)}
        </Text>
  
        <div className="mt-2 space-x-2 items-center">
          {tasks.map(task => (
            <TaskHistoryPopUp
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </Card>
    )
  }
  