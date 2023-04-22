import {AppThunk} from '../app/store';
import {authAPI, AuthRequestType, ResultCode} from '../api/todolist-api';
import {handlerServerNetworkError, handleServerAppError} from '../utils/error-utils';
import {setStatusAC} from './errorReducer';
import {clearData} from './todolistReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type InitialAuthReducerStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        authAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const { authAC } = loginSlice.actions

export const authReducer = loginSlice.reducer

export const loginTC = (data: AuthRequestType): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'initialized'}))

    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(authAC({value: true}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'initialized'}))

    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(authAC({value: false}))
                dispatch(setStatusAC({status: 'succeeded'}))
                dispatch(clearData())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}

export const authMeTC = (): AppThunk => dispatch => {
    dispatch(setStatusAC({status: 'initialized'}))

    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(authAC({value: true}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}
