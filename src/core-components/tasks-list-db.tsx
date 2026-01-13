import Button from "../components/button";
import PlusIcon from "../assets/icons/Plus-Regular.svg?react"
import { TaskState, type Task } from "../models/task";
import taskUseCases from "../useCases/taskUseCases";
import TaskItemDB from "./task-item-db";

export default function TasksListDB(){

    const {addTask, isLoadingTasks, tasks} = taskUseCases()

    function handleNewTask(){
        addTask("")
    }

    return (
    <>
        <section>
            <Button 
                icon={PlusIcon} 
                className="w-full"
                onClick={handleNewTask}
                disabled={tasks.some((task) => task.state === TaskState.Creating) || isLoadingTasks}
            >
                Nova Tarefa</Button>
        </section>
        <section className="space-y-2">
            {tasks.map((task)=> (
                <TaskItemDB key={task.id} task={task}/>
            ))}
            {isLoadingTasks && <>
                <TaskItemDB task={{} as Task} loading/>
                <TaskItemDB task={{} as Task} loading/>
                <TaskItemDB task={{} as Task} loading/>
                <TaskItemDB task={{} as Task} loading/>
            </>}
        </section>
    </>
    )
}