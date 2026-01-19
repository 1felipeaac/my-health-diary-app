import Container from "../components/container";
import TasksSummaryDB from "../core-components/tasks-summary-db";
import TasksWeekList from "../core-components/tasks-week-list-db";
import taskUseCases from "../useCases/taskUseCases";


export default function PageHistory(){
    const {totalTasksCounts, totalConcludedTasksCount, isLoadingTasks} = taskUseCases()
    return <Container as="article" className="space-y-3">
        <header className="flex items-center justify-between">
            <TasksSummaryDB
                total={totalTasksCounts}
                concluded={totalConcludedTasksCount}
                loading={isLoadingTasks}
                labels={{
                    total: 'Tarefas Criadas',
                    concluded: 'Tarefas Concluídas'
                }}
            />
        </header>
        <TasksWeekList/>
    </Container>
}