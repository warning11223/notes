import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '562837c4-f081-441e-8b82-efb66f432caa'
    }
});

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>(`todo-lists`)
            .then(res => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
            .then(res => res.data)
    },
    removeTodolist(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
            .then(res => res.data)
    },
    editTodolist(id: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title})
            .then(res => res.data)
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
            .then(res => res.data.items)
    },
    addTask(todolistID: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistID}/tasks`, {title: taskTitle})
            .then(res => res.data)
    },
    editTask(todolistID: string, taskID: string, properties: {
        title: string
        description: string
        completed: boolean
        status: number
        priority: number
        startDate: string
        deadline: string
    }) {
        return instance.put<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistID}/tasks/${taskID}`, properties)
            .then(res => res)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistID}/tasks/${taskID}`)
            .then(res => res.data)
    }
}

export const authAPI = {
    login(data: AuthRequestType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>, AuthRequestType>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType<{}>>('auth/login')
    },
    me() {
        return instance.get<ResponseType<AuthResponseMeType>>('auth/me')
    }
}


export type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export const ResultCode = {
    OK: 0,
    Error: 1,
    Captcha: 10
} as const

/*export enum ResultCode {
    OK = 0,
    Error = 1,
    Captcha = 10
}*/

export type TaskResponseType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksType = {
    items: TaskResponseType[]
    error: string | null
    totalCount: number
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TodolistResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type GetTasksResponseType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}
export type AuthRequestType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type AuthResponseMeType = {
    id: number
    email: string
    login: string
}
