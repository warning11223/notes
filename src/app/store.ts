import {AnyAction, combineReducers} from 'redux';
import {tasksReducer} from '../reducers/tasksReducer';
import {todolistReducer} from '../reducers/todolistReducer';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {errorReducer} from '../reducers/errorReducer';
import {authReducer} from '../reducers/authReducer';
import {configureStore} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    tasksReducer,
    todolistReducer,
    errorReducer,
    authReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

// @ts-ignore
window.store = store;
