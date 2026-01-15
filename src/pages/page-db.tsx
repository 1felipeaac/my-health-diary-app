import Container from "../components/container";
import TasksListDB from "../core-components/tasks-list-db";
import TasksSummaryDB from "../core-components/tasks-summary-db";
import taskUseCases from "../useCases/taskUseCases";

export default function PageDB(){
    const {todaysTasksCounts, todaysConcludedTasksCount, isLoadingTasks} = taskUseCases()
    return <Container as="article" className="space-y-3">
        <header className="flex items-center justify-between">
            <TasksSummaryDB
                total={todaysTasksCounts}
                concluded={todaysConcludedTasksCount}
                loading={isLoadingTasks}
            />
        </header>
        <TasksListDB/>
    </Container>
}