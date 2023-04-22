import {v1} from 'uuid';

import {
    addTodolistAC, changeEntityStatusAC,
    changeFilterAC,
    editTodolistAC,
    removeTodolistAC, setTodolistsAC,
    todolistReducer,
    TodoListType
} from './todolistReducer';
import {errorReducer} from './errorReducer';

const todoListId1 = v1()
const todoListId2 = v1()
let todoLists: TodoListType[] = []

beforeEach(() => {
    todoLists = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
})

test('todolistReducer should add new todolist', () => {
    //action
    const newTodolist: TodoListType = {id: v1(), title: 'new todolist', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'};
    const action = addTodolistAC({todolist: newTodolist})
    const newState = todolistReducer(todoLists, action);

    //expectation

    expect(newState.length).toBe(3)
    expect(newState[0].title).toBe('new todolist')
})

test('todolistReducer should remove todolist', () => {
    const action = removeTodolistAC({todolistID: todoListId1})
    const newState = todolistReducer(todoLists, action)

    expect(newState.length).toBe(1)
    expect(newState[0].title).toBe('What to buy')
})

test('todolistReducer should edit title of todolist', () => {
    const action = editTodolistAC({title: 'NEW TITLE', todolistID: todoListId1})
    const newState = todolistReducer(todoLists, action);

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('NEW TITLE')
})

test('filter of tasks should be changed', () => {
    const newState = todolistReducer(todoLists, changeFilterAC({todolistID: todoListId1, filter: 'active'}))

    expect(newState[0].filter).toBe('active')
    expect(newState[1].filter).toBe('all')
})

test('get todolists', () => {
    const state: TodoListType[] = ([])
    const todoLists = [
        {id: v1(), title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: v1(), title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]

    const newState = todolistReducer(state, setTodolistsAC({todolists: todoLists}))

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('What to learn')
})

test('entityStatus should be edited', () => {
    const newState = todolistReducer(todoLists, changeEntityStatusAC({todolistID: todoListId1, status: 'loading'}))

    expect(newState[0].entityStatus).toBe('loading')

})
