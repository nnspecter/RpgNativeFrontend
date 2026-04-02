export interface AuthData{
    username: string;
    password: string;
};

export type Task = {
    taskId?: number;
    taskName: string;
    description: string;
    time: number;
    isComplete: boolean
};

export type Tasks = Task[];