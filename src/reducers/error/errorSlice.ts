import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type StatusTypes =
    | 'idle'
    | 'loading'
    | 'succeeded'
    | 'failed'
    | 'loadingTasks'
    | 'initialized';

export type InitialStateType = typeof initialState;

const initialState = {
    status: 'idle' as StatusTypes,
    error: null as string | null,
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setStatusAC: (state, action: PayloadAction<{ status: StatusTypes }>) => {
            state.status = action.payload.status;
        },
        setErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
    },
    extraReducers: builder => {
        builder
            .addMatcher((action) => {
                    return action.type.endsWith('/pending')
                },
                (state, action) => {
                    if (action.type.startsWith('tasks')) {
                        state.status = 'loadingTasks'
                    }
                    state.status = 'loading'
                }
            )
            .addMatcher(action => {
                    return action.type.endsWith('/fulfilled')
                },
                (state, action) => {
                    state.status = 'succeeded'
                }
            )
           /* .addMatcher(action => {
                    return action.type.endsWith('/rejected')
                },
                (state, action) => {
                    if (action.type.includes('addTodolist')) return

                    if (action.payload) {
                        state.error = 'action payload'
                    } else {
                        state.error = action.error.message ? action.error.message : 'Some error occurred'
                    }
                    state.status = 'failed'
                }
            )*/
    }
});

export const errorActions = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
