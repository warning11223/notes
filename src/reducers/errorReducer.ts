import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type StatusTypes = 'idle' | 'loading' | 'succeeded' | 'failed' | 'loadingTasks' | 'initialized'

export type InitialStateType = typeof initialState

const initialState = {
    status: 'idle' as StatusTypes,
    error: null as null | string,
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setStatusAC: (state, action: PayloadAction<{ status: StatusTypes }>) => {
            state.status = action.payload.status;
        },
        setErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        }
    }
})

export const { setStatusAC, setErrorAC } = errorSlice.actions

export const errorReducer = errorSlice.reducer
