import {v1} from 'uuid';

import {
    addTodolistAC,
    changeFilterAC,
    editTodolistAC,
    removeTodolistAC, setTodolistsAC,
    todolistReducer,
    TodoListType
} from './todolistReducer';

const todoListId1 = v1()
const todoListId2 = v1()
let todoLists: TodoListType[] = []

beforeEach(() => {
    todoLists = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]
})

test('todolistReducer should add new todolist', () => {
    //action
    const newTodolist: TodoListType = {id: v1(), title: 'new todolist', filter: 'all', addedDate: '', order: 0};
    const action = addTodolistAC(newTodolist)
    const newState = todolistReducer(todoLists, action);

    //expectation

    expect(newState.length).toBe(3)
    expect(newState[0].title).toBe('new todolist')
})

test('todolistReducer should remove todolist', () => {
    const action = removeTodolistAC(todoListId1)
    const newState = todolistReducer(todoLists, action)

    expect(newState.length).toBe(1)
    expect(newState[0].title).toBe('What to buy')
})

test('todolistReducer should edit title of todolist', () => {
    const action = editTodolistAC('NEW TITLE', todoListId1)
    const newState = todolistReducer(todoLists, action);

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('NEW TITLE')
})

test('filter of tasks should be changed', () => {
    const newState = todolistReducer(todoLists, changeFilterAC(todoListId1, 'active'))

    expect(newState[0].filter).toBe('active')
    expect(newState[1].filter).toBe('all')
})

test('get todolists', () => {
    const state: TodoListType[] = ([])
    const todoLists = [
        {id: v1(), title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: v1(), title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]

    const newState = todolistReducer(state, setTodolistsAC(todoLists))

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('What to learn')
})
