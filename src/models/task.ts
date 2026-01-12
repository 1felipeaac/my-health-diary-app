export const TASKS_KEY = "tasks"

export enum TaskState{
    Creating = 'creating',
    Created = 'created'
}

export enum TaskRating{
    Good = 'good',
    Average = 'average',
    Bad = 'bad'
}

export interface Task {
    id: string,
    title: string,
    concluded?: boolean,
    state?:TaskState,
    rating?: TaskRating
}