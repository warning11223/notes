import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {ActionsTasksType, tasksReducer} from '../reducers/tasksReducer';
import {ActionsTodolistsTypes, todolistReducer} from '../reducers/todolistReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ActionErrorTypes, errorReducer} from '../reducers/errorReducer';
import {ActionsAuthReducerType, authReducer} from '../reducers/authReducer';

export const rootReducer = combineReducers({
    tasksReducer,
    todolistReducer,
    errorReducer,
    authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsAppType>
export type RootState = ReturnType<typeof rootReducer>



export type ActionsAppType = ActionsTasksType | ActionsTodolistsTypes | ActionErrorTypes | ActionsAuthReducerType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsAppType>

// @ts-ignore
window.store = store;
