import {AppThunk} from '../app/store';
import {authAPI, AuthRequestType, ResultCode} from '../api/todolist-api';
import {handlerServerNetworkError, handleServerAppError} from '../utils/error-utils';
import {setStatusAC} from './errorReducer';
import {clearData} from './todolistReducer';

export type InitialAuthReducerStateType = typeof initialState

export type ActionsAuthReducerType = AuthACType

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialAuthReducerStateType = initialState, action: ActionsAuthReducerType): InitialAuthReducerStateType => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

type AuthACType = ReturnType<typeof authAC>

export const authAC = (value: boolean) => ({
    type: 'LOGIN', value
})

export const loginTC = (data: AuthRequestType): AppThunk => dispatch => {
    dispatch(setStatusAC('initialized'))

    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(authAC(true))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setStatusAC('initialized'))

    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(authAC(false))
                dispatch(setStatusAC('succeeded'))
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
    dispatch(setStatusAC('initialized'))

    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(authAC(true))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handlerServerNetworkError(err, dispatch)
        })
}
