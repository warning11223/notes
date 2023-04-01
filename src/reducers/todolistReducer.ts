import {FilterValuesType} from '../App';
import {todolistAPI, TodolistResponseType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppThunk} from '../redux/store';
import {addInitialAC} from './tasksReducer';

export type ActionsTodolistsTypes =
    AddTodoListActionType
    | RemoveTodoListActionType
    | EditTodoListActionType
    | ChangeFilterType
    | SetTodolistsType;

export type TodoListType = TodolistResponseType & {
    filter: FilterValuesType
}

const initialState: TodoListType[] = [
    /*{id: todoListId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},*/
];

export const todolistReducer = (state = initialState, action: ActionsTodolistsTypes): TodoListType[] => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            //const newTodoList: TodoListType =  { id: v1(), title: action.title, filter: 'all'};
            return [action.payload.newTodolist, ...state]
        case 'REMOVE_TODOLIST':
            return state.filter(item => item.id !== action.payload.id)
        case 'EDIT_TITLE_TODOLIST':
            return state.map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)
        case 'CHANGE_FILTER':
            return state.map(item => item.id === action.payload.todoListId ? {
                ...item,
                filter: action.payload.filter
            } : item)
        case 'SET_TODOLISTS':
            return action.payload.todolists.map(item => {
                return {...item, filter: 'all'}
            })
        default:
            return state;
    }
}

export type AddTodoListActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>;
export type EditTodoListActionType = ReturnType<typeof editTodolistAC>;
export type ChangeFilterType = ReturnType<typeof changeFilterAC>;
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>;

export const addTodolistAC = (newTodolist: TodoListType) => ({
    type: 'ADD_TODOLIST', payload: {newTodolist}
}) as const;

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE_TODOLIST', payload: {id}
}) as const;

export const editTodolistAC = (title: string, id: string) => ({
    type: 'EDIT_TITLE_TODOLIST', payload: {title, id}
}) as const;

export const changeFilterAC = (todoListId: string, filter: FilterValuesType) => ({
    type: 'CHANGE_FILTER', payload: {todoListId, filter}
}) as const;

export const setTodolistsAC = (todolists: TodolistResponseType[]) => ({
    type: 'SET_TODOLISTS', payload: {todolists}
}) as const


export const getTodolistsTC = (): AppThunk => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(todolists => {
            dispatch(setTodolistsAC(todolists))
        })
}

export const removeTodolistTC = (todolistID: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPI.removeTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolistAC(todolistID))
        })
}

export const createTodolistTC = (title: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            const todolist: TodoListType = {
                id: res.item.id,
                filter: 'all',
                title: res.item.title,
                order: res.item.order,
                addedDate: res.item.addedDate
            }
            dispatch(addTodolistAC(todolist))
            dispatch(addInitialAC(res.item.id))
        })
}

export const editTodolistTC = (todolistID: string, title: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPI.editTodolist(todolistID, title)
        .then(() => {
            dispatch(editTodolistAC(title, todolistID))
        })
}
