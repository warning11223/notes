export type StatusTypes = 'idle' | 'loading' | 'succeeded' | 'failed' | 'loadingTasks' | 'loadingApp'

export type InitialStateType = typeof initialState

export type ActionErrorTypes = SetStatusType | SetErrorType

const initialState = {
    status: 'idle' as StatusTypes,
    error: null as null | string,
}

export const errorReducer = (state = initialState, action: ActionErrorTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'SET_ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state;
    }
}

export type SetStatusType = ReturnType<typeof setStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>


export const setStatusAC = (status: StatusTypes) => ({
    type: 'SET_STATUS', status
} as const)
export const setErrorAC = (error: string | null) => ({
    type: 'SET_ERROR', error
} as const)
