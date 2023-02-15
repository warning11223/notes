import {TasksType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todolistReducer';

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeCheckedActionType | EditTaskActionType | RemoveTodoListActionType | AddTodoListActionType | AddInitialArrayType

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(item => item.id !== action.payload.taskId)};
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todoListId]: [...state[action.payload.todoListId], newTask]}
        case 'ADD-INITIAL-ARRAY':
            return {...state, [action.payload.todoListId]: []}
        case 'CHANGE-CHECKED':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(item => item.id === action.payload.taskId ? {...item, isDone: action.payload.checked} : item)}
        case 'EDIT-TASK':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(item => item.id === action.payload.taskId ? {...item, title: action.payload.title} : item)}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        case 'ADD-TODOLIST':
            return {...state, [v1()]: []}
        default:
            return state;
    }
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeCheckedActionType = ReturnType<typeof changeCheckedAC>;
type EditTaskActionType = ReturnType<typeof editTaskAC>;
type AddInitialArrayType = ReturnType<typeof addInitialAC>;

export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: 'REMOVE-TASK', payload: { todoListId, taskId }
}) as const;

export const addTaskAC = (todoListId: string, title: string) => ({
    type: 'ADD-TASK', payload: { todoListId, title }
}) as const;

export const changeCheckedAC = (todoListId: string, taskId: string, checked: boolean) => ({
    type: 'CHANGE-CHECKED', payload: { todoListId, taskId, checked }
}) as const;

export const editTaskAC = (todoListId: string, taskId: string, title: string) => ({
    type: 'EDIT-TASK', payload: { todoListId, taskId, title  }
}) as const;

export const addInitialAC = (todoListId: string) => ({
    type: 'ADD-INITIAL-ARRAY', payload: { todoListId }
}) as const;

