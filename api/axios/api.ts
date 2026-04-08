import {AuthData, Character, Metrics, Task, Tasks, UpdateTask} from "./apiTypes"
import { axiosApi } from "./axiosApi"



//Логин
export const startLogin = async (data: AuthData) => {
    const res =  await axiosApi.post('/auth/login', data)
    return res.data
}
//регистрация
export const startRegistration = async (data: AuthData) => {
    const res =  await axiosApi.post('/auth/register', data)
    return res.data
}

//Tasks 
export const getTasks = async (): Promise<Tasks> => {
    const res =  await axiosApi.get('/api/v1/tasks');
    return res.data
}

export const newTask = async (task: Task) => {
    const res =  await axiosApi.post('/api/v1/tasks/new', task);
    return res.data
}

export const updTask = async (task: UpdateTask) => {
    const res =  await axiosApi.put('/api/v1/tasks/upd', task);
    return res.data
}
export const delTask = async (taskId: number) => {
    const res =  await axiosApi.delete(`/api/v1/tasks/del/${taskId}`);
    return res.data
}

//Character
export const getCharacter = async (): Promise<Character> => {
    const res =  await axiosApi.get('/api/v1/character');
    return res.data
}

//Metrics
export const getMetrics = async (): Promise<Metrics> => {
    const res =  await axiosApi.get('/api/v1/metrics');
    return res.data
}