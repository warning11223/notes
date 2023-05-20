import {v1} from 'uuid';
import {changeEntityStatusAC, changeFilterAC, clearData, todolistReducer, todolistThunks, TodoListType} from './todolistReducer';

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
    const newTodolist: TodoListType = {
        id: v1(),
        title: 'new todolist',
        filter: 'all',
        addedDate: '',
        order: 0,
        entityStatus: 'idle'
    };
    const action = todolistThunks.createTodolist.fulfilled({todolist: newTodolist}, 'requestId', todoListId1)
    const newState = todolistReducer(todoLists, action);

    //expectation
    expect(newState.length).toBe(3)
    expect(newState[0].title).toBe('new todolist')
})

test('todolistReducer should remove todolist', () => {
    const action = todolistThunks.removeTodolist.fulfilled({todolistID: todoListId1}, 'requestId', {todolistID: todoListId1})

    const newState = todolistReducer(todoLists, action)

    expect(newState.length).toBe(1)
    expect(newState[0].title).toBe('What to buy')
})

test('todolistReducer should edit title of todolist', () => {
    const action = todolistThunks.editTodolist.fulfilled({title: 'NEW TITLE', todolistID: todoListId1}, 'requestId', {title: 'NEW TITLE', todolistID: todoListId1})

    const newState = todolistReducer(todoLists, action);

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('NEW TITLE')
})

test('get todolists', () => {
    const state: TodoListType[] = ([])
    const todolists = [
        {id: v1(), title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: v1(), title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]

    const action = todolistThunks.getTodolists.fulfilled({ todolists }, 'requestId')

    const newState = todolistReducer(state, action)

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('What to learn')
})

test('entityStatus should be edited', () => {
    const newState = todolistReducer(todoLists, changeEntityStatusAC({todolistID: todoListId1, status: 'loading'}))

    expect(newState[0].entityStatus).toBe('loading')

})

test('filter of tasks should be changed', () => {
    const newState = todolistReducer(todoLists, changeFilterAC({todolistID: todoListId1, filter: 'active'}))

    expect(newState[0].filter).toBe('active')
    expect(newState[1].filter).toBe('all')
})

test('should return empty array', () => {
    const newState = todolistReducer(todoLists, clearData())
    expect(newState.length).toBe(0)
})
