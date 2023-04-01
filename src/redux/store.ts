import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {ActionsTasksType, tasksReducer} from '../reducers/tasksReducer';
import {ActionsTodolistsTypes, todolistReducer} from '../reducers/todolistReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    tasksReducer,
    todolistReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsAppType>
export type RootState = ReturnType<typeof store.getState>



export type ActionsAppType = ActionsTasksType | ActionsTodolistsTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
