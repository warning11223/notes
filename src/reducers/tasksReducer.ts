import {v1} from 'uuid';
import {AddTodoListActionType, ClearDataType, RemoveTodoListActionType, SetTodolistsType} from './todolistReducer';
import {ResultCode, TaskResponseType, todolistAPI} from '../api/todolist-api';
import {AppThunk, RootState} from '../app/store';
import {Dispatch} from 'redux';
import {setStatusAC} from './errorReducer';
import {handlerServerNetworkError, handleServerAppError} from '../utils/error-utils';

export type ActionsTasksType =
    RemoveTaskActionType
    | AddTaskActionType
    | EditTaskActionType
    | RemoveTodoListActionType
    | AddTodoListActionType
    | AddInitialArrayType
    | SetTasksACType
    | SetTodolistsType
    | ClearDataType

export type TasksType = {
    [key: string]: TaskResponseType[]
}

export type UpdateTaskModelType = {
    title?: string,
    description?: string,
    completed?: boolean,
    status?: number,
    priority?: number,
    startDate?: string,
    deadline?: string,
}

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TasksType = {
    /*[todoListId1]: [
        {id: v1(), title: 'HTML&CSS', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
        {id: v1(), title: 'JS', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
        {id: v1(), title: 'ReactJS', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
        {id: v1(), title: 'Rest API', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
        {id: v1(), title: 'GraphQL', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
    ],
    [todoListId2]: [
        {id: v1(), title: 'Milk', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
        {id: v1(), title: 'Bred', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
    ]*/
}

export const tasksReducer = (state = initialState, action: ActionsTasksType): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(item => item.id !== action.payload.taskId)
            };
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            };
        case 'ADD_INITIAL_ARRAY':
            return {...state, [action.payload.todoListId]: []}
        case 'EDIT_TASK':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(item => item.id === action.payload.taskId ? {
                    ...item,
                    ...action.payload.model
                } : item)
            };
        case 'REMOVE_TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        case 'ADD_TODOLIST':
            return {...state, [v1()]: []};
        case 'SET_TASKS':
            return {...state, [action.payload.todolistID]: action.payload.tasks};
        case 'SET_TODOLISTS':
            const copyState = {...state};

            action.payload.todolists.forEach(item => {
                copyState[item.id] = [];
            })

            return copyState;
        case 'CLEAR_DATA':
            return {}
        default:
            return state;
    }
}

export type RemoveTaskActionType = ReturnType<typeof deleteTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type EditTaskActionType = ReturnType<typeof editTaskAC>;
export type AddInitialArrayType = ReturnType<typeof addInitialAC>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;

export const deleteTaskAC = (todoListId: string, taskId: string) => ({
    type: 'REMOVE_TASK', payload: {todoListId, taskId}
}) as const;

export const addTaskAC = (task: TaskResponseType) => ({
    type: 'ADD_TASK', payload: {task}
}) as const;

export const editTaskAC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: 'EDIT_TASK', payload: {todoListId, taskId, model}
}) as const;

export const addInitialAC = (todoListId: string) => ({
    type: 'ADD_INITIAL_ARRAY', payload: {todoListId}
}) as const;

export const setTasksAC = (todolistID: string, tasks: TaskResponseType[]) => ({
    type: 'SET_TASKS', payload: {tasks, todolistID}
}) as const

export const setTasksTC = (todolistID: string): AppThunk => dispatch => {
    dispatch(setStatusAC('loadingTasks'))

    todolistAPI.getTasks(todolistID)
        .then(tasks => {
            dispatch(setTasksAC(todolistID, tasks))
            dispatch(setStatusAC('succeeded'))
        })
        .catch(err => {
            dispatch(setStatusAC('failed'))
            handlerServerNetworkError(err, dispatch)
        })
}
export const deleteTaskTC = (todolistID: string, taskID: string): AppThunk => dispatch => {
    dispatch(setStatusAC('loading'))

    todolistAPI.deleteTask(todolistID, taskID)
        .then(() => {
            dispatch(deleteTaskAC(todolistID, taskID))
            dispatch(setStatusAC('succeeded'))
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}

export const addTaskTC = (todolistID: string, taskTitle: string): AppThunk => dispatch => {
    dispatch(setStatusAC('loadingTasks'))

    todolistAPI.addTask(todolistID, taskTitle)
        .then((res) => {
            if (res.resultCode === ResultCode.OK) {
                dispatch(addTaskAC(res.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                dispatch(setStatusAC('failed'))
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            dispatch(setStatusAC('failed'))
            handlerServerNetworkError(err, dispatch)
        })
}

export const editTaskTC = (todolistID: string, taskID: string, taskModel: UpdateTaskModelType): AppThunk => (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setStatusAC('loading'))

    const state = getState();
    const task = state.tasksReducer[todolistID].find(item => item.id === taskID);
    if (!task) {
        console.warn('task not found in the state');
        return;
    }

    const model = {
        title: task.title,
        completed: task.completed,
        status: task.status,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        ...taskModel
    }

    todolistAPI.editTask(todolistID, taskID, model)
        .then(res => {
            if (res.resultCode === ResultCode.OK) {
                dispatch(editTaskAC(todolistID, taskID, model))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }

        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}
