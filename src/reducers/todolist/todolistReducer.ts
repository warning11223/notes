import {FilterValuesType} from '../../app/App';
import {ResultCode, todolistAPI, TodolistResponseType} from '../../api/todolist-api';
import {tasksThunks} from '../tasks/tasksReducer';
import {errorActions, StatusTypes} from '../error/errorReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk, handlerServerNetworkError, handleServerAppError} from '../../utils';

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
        changeFilterAC: (state, action: PayloadAction<{ todolistID: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(item => item.id === action.payload.todolistID);
            if (index > -1) {
                state[index].filter = action.payload.filter;
            }
        },
        changeEntityStatusAC: (state, action: PayloadAction<{ todolistID: string, status: StatusTypes }>) => {
            const index = state.findIndex(item => item.id === action.payload.todolistID);
            if (index > -1) {
                state[index].entityStatus = action.payload.status;
            }
        },
        clearData: () => {
            return []
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(item => ({...item, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.id === action.payload.todolistID);
                if (index > -1) {
                    state.splice(index, 1);
                }
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift(action.payload.todolist)
            })
            .addCase(editTodolist.fulfilled, (state, action) => {
                /* const index = state.findIndex(item => item.id === action.payload.todolistID);
                 if (index > -1) {
                     state[index].title = action.payload.title
                 }*/
                const todo = state.find(item => item.id === action.payload.todolistID)
                if (todo) todo.title = action.payload.title
            })
    }
})



const getTodolists = createAppAsyncThunk<{ todolists: TodolistResponseType[] }, void>('todolist/getTodolists', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(errorActions.setStatusAC({status: 'loading'}))
        const todolists = await todolistAPI.getTodolists()
        todolists.forEach(item => {
            dispatch(tasksThunks.fetchTasks(item.id))
        })
        dispatch(errorActions.setStatusAC({status: 'succeeded'}))
        return {todolists}
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const removeTodolist = createAppAsyncThunk<{ todolistID: string }, { todolistID: string }>('todolist/removeTodolist', async ({todolistID}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(errorActions.setStatusAC({status: 'loading'}))
        dispatch(changeEntityStatusAC({todolistID, status: 'loading'}))

        const res = await todolistAPI.removeTodolist(todolistID)
        if (res.resultCode === ResultCode.OK) {
            dispatch(errorActions.setStatusAC({status: 'succeeded'}))
            return {todolistID}
        } else {
            handleServerAppError(res, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        dispatch(changeEntityStatusAC({todolistID, status: 'failed'}))
        return rejectWithValue(null)
    }
})

const createTodolist = createAppAsyncThunk<{ todolist: TodoListType }, string>('todolist/createTodolist', async (title, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(errorActions.setStatusAC({status: 'loading'}))

        const res = await todolistAPI.createTodolist(title)
        if (res.resultCode === ResultCode.OK) {
            const todolist: TodoListType = {
                id: res.data.item.id,
                filter: 'all',
                title: res.data.item.title,
                order: res.data.item.order,
                addedDate: res.data.item.addedDate,
                entityStatus: 'idle'
            }
            dispatch(errorActions.setStatusAC({status: 'succeeded'}))
            return {todolist}
        } else {
            handleServerAppError(res, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const editTodolist = createAppAsyncThunk<{ todolistID: string, title: string }, { todolistID: string, title: string }>('todolist/editTodolist', async ({todolistID, title}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(errorActions.setStatusAC({status: 'loading'}))

        const res = await todolistAPI.editTodolist(todolistID, title)
        if (res.resultCode === ResultCode.OK) {
            dispatch(errorActions.setStatusAC({status: 'succeeded'}))
            return {title, todolistID}
        } else {
            handleServerAppError(res, dispatch)
            return rejectWithValue(null)
        }

    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

export const {
    changeEntityStatusAC,
    clearData,
    changeFilterAC
} = todolistSlice.actions

export const todolistReducer = todolistSlice.reducer

export const todolistThunks = {
    getTodolists,
    removeTodolist,
    createTodolist,
    editTodolist
}
