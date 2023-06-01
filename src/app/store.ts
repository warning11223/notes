import { AnyAction, combineReducers } from "redux";
import { tasksReducer } from "../reducers/tasks/tasksSlice";
import { todolistReducer } from "../reducers/todolist/todolistSlice";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { errorReducer } from "../reducers/error/errorSlice";
import { authSlice } from "../reducers/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  tasksReducer: tasksReducer,
  todolistReducer: todolistReducer,
  errorReducer: errorReducer,
  authReducer: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

// @ts-ignore
window.store = store;
