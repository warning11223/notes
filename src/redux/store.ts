import {combineReducers, createStore} from 'redux';
import { tasksReducer } from '../reducers/tasksReducer';
import { todolistReducer } from '../reducers/todolistReducer';

const rootReducer = combineReducers({
    tasksReducer,
    todolistReducer,

})

export const store = createStore(rootReducer);

export type AppDispatch = ReturnType<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
