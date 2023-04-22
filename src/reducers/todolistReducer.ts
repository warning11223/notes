import {FilterValuesType} from '../app/App';
import {ResultCode, todolistAPI, TodolistResponseType} from '../api/todolist-api';
import {AppThunk} from '../app/store';
import {setTasksTC} from './tasksReducer';
import {setStatusAC, StatusTypes} from './errorReducer';
import {handlerServerNetworkError, handleServerAppError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TodoListType = TodolistResponseType & {
    filter: FilterValuesType
    entityStatus: StatusTypes
}

const initialState: TodoListType[] = [
    /*{id: todoListId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},*/
];

const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodoListType }>) => {
            state.unshift(action.payload.todolist);
        },
        removeTodolistAC: (state, action: PayloadAction<{ todolistID: string }>) => {
            const index = state.findIndex(item => item.id === action.payload.todolistID);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        editTodolistAC: (state, action: PayloadAction<{ title: string, todolistID: string }>) => {
            const index = state.findIndex(item => item.id === action.payload.todolistID);
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeFilterAC: (state, action: PayloadAction<{ todolistID: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(item => item.id === action.payload.todolistID);
            if (index > -1) {
                state[index].filter = action.payload.filter;
            }
        },
        setTodolistsAC: (state, action: PayloadAction<{ todolists: TodolistResponseType[] }>) => {
            return action.payload.todolists.map(item => ({...item, filter: 'all', entityStatus: 'idle'}))
        },
        changeEntityStatusAC: (state, action: PayloadAction<{ todolistID: string, status: StatusTypes }>) => {
            const index = state.findIndex(item => item.id === action.payload.todolistID);
            if (index > -1) {
                state[index].entityStatus = action.payload.status;
            }
        },
        clearData: (state, action: PayloadAction) => {
            return []
        },
    }
})

export const {
    removeTodolistAC,
    editTodolistAC,
    addTodolistAC,
    changeEntityStatusAC,
    setTodolistsAC,
    clearData,
    changeFilterAC
} = todolistSlice.actions

export const todolistReducer = todolistSlice.reducer

/*export const todolistReducer = (state = initialState, action: ActionsTodolistsTypes): TodoListType[] => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            //const newTodoList: TodoListType =  { id: v1(), title: action.title, filter: 'all'};
            return [action.payload.newTodolist, ...state]
        case 'REMOVE_TODOLIST':
            return state.filter(item => item.id !== action.payload.id)
        case 'EDIT_TITLE_TODOLIST':
            return state.map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)
        case 'CHANGE_FILTER':
            return state.map(item => item.id === action.payload.todoListId ? {
                ...item,
                filter: action.payload.filter
            } : item)
        case 'SET_TODOLISTS':
            return action.payload.todolists.map(item => ({...item, filter: 'all', entityStatus: 'idle'}))
        case 'SET_ENTITY_STATUS':
            return state.map(item => item.id === action.todolistId ? {...item, entityStatus: action.status} : item)
        case 'CLEAR_DATA':
            return []
        default:
            return state;
    }
}*/

/*
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>;
export type EditTodoListActionType = ReturnType<typeof editTodolistAC>;
export type ChangeFilterType = ReturnType<typeof changeFilterAC>;
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>;
export type ChangeEntityStatusACType = ReturnType<typeof changeEntityStatusAC>;
export type ClearDataType = ReturnType<typeof clearData>;
*/

// action creators

/*
export const addTodolistAC = (newTodolist: TodoListType) => ({
    type: 'ADD_TODOLIST', payload: {newTodolist}
} as const)

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE_TODOLIST', payload: {id}
} as const)

export const editTodolistAC = (title: string, id: string) => ({
    type: 'EDIT_TITLE_TODOLIST', payload: {title, id}
} as const)


export const setTodolistsAC = (todolists: TodolistResponseType[]) => ({
    type: 'SET_TODOLISTS', payload: {todolists}
} as const)

export const changeEntityStatusAC = (todolistId: string, status: StatusTypes) => ({
    type: 'SET_ENTITY_STATUS', todolistId, status
} as const)

export const clearData = () => ({
    type: 'CLEAR_DATA'
} as const)
*/

//thunk creators

export const getTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))

    todolistAPI.getTodolists()
        .then(todolists => {
            dispatch(setTodolistsAC({todolists}))
            dispatch(setStatusAC({status: 'succeeded'}))
            return todolists
        })
        .then(todolists => {
            todolists.forEach(item => {
                dispatch(setTasksTC(item.id))
            })
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}
export const removeTodolistTC = (todolistID: string): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'loading'}))
    dispatch(changeEntityStatusAC({todolistID, status: 'loading'}))

    todolistAPI.removeTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolistAC({todolistID}))
            dispatch(setStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
            dispatch(changeEntityStatusAC({todolistID, status: 'failed'}))
        })
}
export const createTodolistTC = (title: string): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'loading'}))

    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.resultCode === ResultCode.OK) {
                const todolist: TodoListType = {
                    id: res.data.item.id,
                    filter: 'all',
                    title: res.data.item.title,
                    order: res.data.item.order,
                    addedDate: res.data.item.addedDate,
                    entityStatus: 'idle'
                }
                dispatch(addTodolistAC({todolist}))
                //dispatch(addInitialAC({todolistID: res.data.item.id}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}
export const editTodolistTC = (todolistID: string, title: string): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'loading'}))

    todolistAPI.editTodolist(todolistID, title)
        .then(res => {
            if (res.resultCode === ResultCode.OK) {
                dispatch(editTodolistAC({title, todolistID}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}
