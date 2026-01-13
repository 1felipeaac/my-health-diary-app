import Badge from "../components/badge";
import Text from "../components/text";
import taskUseCases from "../useCases/taskUseCases";

export default function TasksSummaryDB(){
    // const { tasksCounts, concludedTasksCount, isLoadingTasks } = useTasks()
    const {tasksCounts, concludedTasksCount, isLoadingTasks} = taskUseCases()
        
     
    return(
        <>
            <div className="flex items-center gap-2">
                <Text variant={"body-sm-bold"} className="!text-gray-300"> Tarefas criadas</Text>
                <Badge 
                    variant={"secondary"} 
                    loading={isLoadingTasks}
                >{tasksCounts}</Badge>
            </div>
            <div className="flex items-center gap-2">
                <Text variant={"body-sm-bold"} className="!text-gray-300"> Concluídas</Text>
                <Badge 
                    variant={"primary"} 
                    loading={isLoadingTasks}
                >{concludedTasksCount} de {tasksCounts}</Badge>
            </div>
        </>
    )

}