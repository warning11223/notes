import {ResultCode, TaskResponseType, todolistAPI} from '../api/todolist-api';
import {AppThunk, RootState} from '../app/store';
import {Dispatch} from 'redux';
import {setStatusAC} from './errorReducer';
import {handlerServerNetworkError, handleServerAppError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addTodolistAC, clearData, removeTodolistAC, setTodolistsAC} from './todolistReducer';

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

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        deleteTaskAC: (state: TasksType, action: PayloadAction<{ todolistID: string, taskID: string }>) => {
            const index = state[action.payload.todolistID].findIndex(item => item.id === action.payload.taskID)
            if (index > -1) {
                state[action.payload.todolistID].splice(index, 1)
            }
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskResponseType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        editTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string, model: UpdateTaskModelType }>) => {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(item => item.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC: (state, action: PayloadAction<{ todolistID: string, tasks: TaskResponseType[] }>) => {
            state[action.payload.todolistID] = action.payload.tasks
        },
    },
    extraReducers: builder => {
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(item => {
                state[item.id] = [];
            })
        });
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistID];
        })
        builder.addCase(clearData, (state, action) => {
            return {}
        })

    }
})

export const {addTaskAC, editTaskAC, deleteTaskAC, setTasksAC} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

/*export const tasksReducer = (state = initialState, action: any): TasksType => {
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

            action.payload.todolists.forEach((item: any) => {
                copyState[item.id] = [];
            })

            return copyState;
        case 'CLEAR_DATA':
            return {}
        default:
            return state;
    }
}*/

/*export type RemoveTaskActionType = ReturnType<typeof deleteTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type EditTaskActionType = ReturnType<typeof editTaskAC>;
export type AddInitialArrayType = ReturnType<typeof addInitialAC>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;*/

/*export const deleteTaskAC = (todoListId: string, taskId: string) => ({
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
}) as const*/

export const setTasksTC = (todolistID: string): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'loadingTasks'}))

    todolistAPI.getTasks(todolistID)
        .then(tasks => {
            dispatch(setTasksAC({todolistID, tasks}))
            dispatch(setStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            dispatch(setStatusAC({status: 'failed'}))
            handlerServerNetworkError(err, dispatch)
        })
}
export const deleteTaskTC = (todolistID: string, taskID: string): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'loading'}))

    todolistAPI.deleteTask(todolistID, taskID)
        .then(() => {
            dispatch(deleteTaskAC({todolistID, taskID}))
            dispatch(setStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}

export const addTaskTC = (todolistID: string, taskTitle: string): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'loadingTasks'}))

    todolistAPI.addTask(todolistID, taskTitle)
        .then((res) => {
            if (res.resultCode === ResultCode.OK) {
                dispatch(addTaskAC({task: res.data.item}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                dispatch(setStatusAC({status: 'failed'}))
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            dispatch(setStatusAC({status: 'failed'}))
            handlerServerNetworkError(err, dispatch)
        })
}

export const editTaskTC = (todolistID: string, taskID: string, taskModel: UpdateTaskModelType): AppThunk => (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setStatusAC({status: 'loading'}))

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
                dispatch(editTaskAC({todolistID, taskID, model}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res, dispatch)
            }

        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}
