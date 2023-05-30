import {authAPI, AuthRequestType, ResultCode} from '../../api/todolist-api';
import {createSlice} from '@reduxjs/toolkit';
import {errorActions} from '../error/errorReducer';
import {createAppAsyncThunk, handlerServerNetworkError, handleServerAppError} from '../../common/utils';
import {todolistFunctions} from '../todolist';

export type InitialAuthReducerStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value
            })
            .addCase(authMe.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value
            })
    }
})

export const authReducer = loginSlice.reducer

const login = createAppAsyncThunk<{ value: boolean }, { data: AuthRequestType }>('login/login', async ({data}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        //dispatch(errorActions.setStatusAC({status: 'initialized'}))
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.OK) {
            //dispatch(errorActions.setStatusAC({status: 'succeeded'}))
            return {value: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(res.data)
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<{ value: boolean }, void>('login/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(errorActions.setStatusAC({status: 'initialized'}))
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(errorActions.setStatusAC({status: 'succeeded'}))
            dispatch(todolistFunctions.clearData())
            return {value: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const authMe = createAppAsyncThunk('login/authMe', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(errorActions.setStatusAC({status: 'initialized'}))
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(errorActions.setStatusAC({status: 'succeeded'}))
            return {value: true}
        } else {
            dispatch(errorActions.setStatusAC({status: 'idle'}))
            return rejectWithValue(null)
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

export const authThunks = {
    login,
    logout,
    authMe
}
