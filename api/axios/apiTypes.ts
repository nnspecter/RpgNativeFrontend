export interface AuthData{
    username: string;
    password: string;
};

export interface AuthResponse{
    accessToken: string; 
    refreshToken: string;
};

export type Task = {
    taskId: number;
    taskName: string;
    description: string;
    time: number;
    isComplete: boolean
};

export type Tasks = Task[];


export type Character = {
    name: string,
    xp: number
}

export type Metrics = {
    streak: number,
    count: number,
}

export type UpdateTask = {
    taskId: number;
    taskName?: string
    description?: string;
    time?: number;
    isComplete?: boolean
}
export type NewTask = {
    taskName: string
    description: string;
    time: number;
}