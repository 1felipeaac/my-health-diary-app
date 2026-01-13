import Container from "../components/container";
import TasksListDB from "../core-components/tasks-list-db";
import TasksSummaryDB from "../core-components/tasks-summary-db";


export default function PageDB(){
    return <Container as="article" className="space-y-3">
        <header className="flex items-center justify-between">
            <TasksSummaryDB/>
        </header>
        <TasksListDB/>
    </Container>
}