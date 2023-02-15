import {v1} from 'uuid';
import {TodoListType} from '../App';
import {
    addTodolistAC,
    changeFilterAC,
    editTodolistAC,
    removeTodolistAC,
    todolistReducer
} from './todolistReducer';

test('todolistReducer should add new todolist', () => {
    //data
    const todoListId1 = v1()
    const todoListId2 = v1()

    const todoLists: TodoListType[] = ([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    //action
    const newTodolist: TodoListType = {id: v1(), title: 'new todolist', filter: 'all'};
    const action = addTodolistAC(newTodolist, 'HELLO WORLD')
    const newState = todolistReducer(todoLists, action);

    //expectation

    expect(newState.length).toBe(3)
    expect(newState[2].title).toBe('HELLO WORLD')
})

test('todolistReducer should remove todolist', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const todoLists: TodoListType[] = ([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])
    const action = removeTodolistAC(todoListId1)
    const newState = todolistReducer(todoLists, action)

    expect(newState.length).toBe(1)
    expect(newState[0].title).toBe('What to buy')
})

test('todolistReducer should edit title of todolist', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoLists: TodoListType[] = ([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const action = editTodolistAC('NEW TITLE', todoListId1)
    const newState = todolistReducer(todoLists, action);

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('NEW TITLE')
})

test('filter of tasks should be changed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoLists: TodoListType[] = ([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const newState = todolistReducer(todoLists, changeFilterAC(todoListId1, 'active'))

    expect(newState[0].filter).toBe('active')
    expect(newState[1].filter).toBe('all')
})

export {}
