import {FilterValuesType, TodoListType} from '../App';
import {todoListId1, todoListId2} from './tasksReducer';

type ActionsTypes = AddTodoListActionType | RemoveTodoListActionType | EditTodoListActionType | ChangeFilterType

 const initialState: TodoListType[] = [
     {id: todoListId1, title: 'What to learn', filter: 'all'},
     {id: todoListId2, title: 'What to buy', filter: 'all'},
 ];

export const todolistReducer = (state = initialState, action: ActionsTypes): TodoListType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            //const newTodoList: TodoListType =  { id: v1(), title: action.title, filter: 'all'};
            return [...state, action.payload.newTodolist]
        case 'REMOVE-TODOLIST':
            return state.filter(item => item.id !== action.payload.id)
        case 'EDIT-TITLE-TODOLIST':
            return state.map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)
        case 'CHANGE-FILTER':
            return state.map(item => item.id === action.payload.todoListId ? {...item, filter: action.payload.filter} : item)
        default:
            return state;
    }
}

export type AddTodoListActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>;
type EditTodoListActionType = ReturnType<typeof editTodolistAC>;
type ChangeFilterType = ReturnType<typeof changeFilterAC>;

export const addTodolistAC = (newTodolist: TodoListType) => ({
    type: 'ADD-TODOLIST', payload: { newTodolist }
}) as const;

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST', payload: { id }
}) as const;

export const editTodolistAC = (title: string, id: string) => ({
    type: 'EDIT-TITLE-TODOLIST', payload: { title, id }
}) as const;

export const changeFilterAC = (todoListId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-FILTER', payload: { todoListId, filter }
}) as const;
