import {v1} from 'uuid';

import {
    addTaskAC,
    editTaskAC,
    deleteTaskAC,
    setTasksAC,
    tasksReducer,
    TasksType
} from './tasksReducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC, TodoListType} from './todolistReducer';
import {TaskStatuses} from '../api/todolist-api';

const todoListId1 = v1()
const todoListId2 = v1()
let tasks: TasksType = {}

beforeEach(() => {
    tasks = {
        [todoListId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                completed: true,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'JS',
                completed: true,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'ReactJS',
                completed: false,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Rest API',
                completed: false,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'GraphQL',
                completed: false,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
        ],
        [todoListId2]: [
            {
                id: v1(),
                title: 'Milk',
                completed: true,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Bred',
                completed: false,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
        ]
    }
})

test('task should be removed from tasks', () => {
    const taskId = tasks[todoListId1][0].id;
    const newTasks = tasksReducer(tasks, deleteTaskAC(todoListId1, taskId))

    expect(newTasks[todoListId1].length).toBe(4)
    expect(newTasks[todoListId1][0].title).toBe('JS')
})

test('task should be added to todolist', () => {
    const taskID = v1();

    const newTask = {
        id: taskID,
        title: 'new task',
        completed: false,
        todoListId: todoListId1,
        status: 1,
        startDate: '',
        order: 0,
        priority: 0,
        description: '',
        deadline: '',
        addedDate: ''
    };

    const newTasks = tasksReducer(tasks, addTaskAC(newTask))

    expect(newTasks[todoListId1].length).toBe(6)
    expect(newTasks[todoListId1][0].title).toBe('new task')
})

test('checked value should be changed to opposite', () => {
    const taskId = tasks[todoListId1][1].id;
    const newTasks = tasksReducer(tasks, editTaskAC(todoListId1, taskId, {status: TaskStatuses.New}))

    expect(newTasks[todoListId1].length).toBe(5)
    expect(newTasks[todoListId1][1].status).toBe(TaskStatuses.New)
})

test('title value of task should be edited', () => {
    const taskId = tasks[todoListId1][1].id;
    const newTasks = tasksReducer(tasks, editTaskAC(todoListId1, taskId, {title: 'NEW VALUE'}))

    expect(newTasks[todoListId1][1].title).toBe('NEW VALUE')
    expect(newTasks[todoListId1].length).toBe(5)
})

test('todolist should be removed', () => {
    const newTasks = tasksReducer(tasks, removeTodolistAC(todoListId2))

    expect(newTasks[todoListId2]).toBeUndefined();
    expect(newTasks[todoListId1].length).toBe(5);
})

test('todolist should be added', () => {
    const newTodolist: TodoListType = {id: v1(), title: 'new todolist', filter: 'all', order: 0, addedDate: ''};
    const newTasks = tasksReducer(tasks, addTodolistAC(newTodolist))

    const keys = Object.keys(newTasks);
    const newKey = keys.find(item => item !== todoListId1 && item !== todoListId2);
    if (!newKey) throw  Error('new key should be added')

    expect(newTasks[newKey]).toEqual([])
})

test('get tasks', () => {
    const newTasks: TasksType = tasksReducer(tasks, setTasksAC(todoListId1, [
        {
            id: v1(),
            title: 'Milk',
            completed: true,
            status: 1,
            todoListId: todoListId1,
            deadline: '',
            description: '',
            priority: 0,
            order: 2,
            startDate: '',
            addedDate: ''
        }
    ]))

    expect(newTasks[todoListId1].length).toBe(1)
    expect(newTasks[todoListId1][0].title).toBe('Milk')
})

test('empty arrays should be added when we set todolists', () => {
    const newTasks: TasksType = tasksReducer(tasks, setTodolistsAC([
        {id: todoListId1, title: 'What to buy', addedDate: '', order: 0},
    ]))

    expect(newTasks[todoListId1]).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    const newTasks: TasksType = tasksReducer(tasks, setTasksAC(todoListId1, [
        {
            id: v1(),
            title: 'Milk',
            completed: true,
            status: 1,
            todoListId: todoListId1,
            deadline: '',
            description: '',
            priority: 0,
            order: 2,
            startDate: '',
            addedDate: ''
        }

    ]))

    expect(newTasks[todoListId1].length).toBe(1)
    expect(newTasks[todoListId1][0].title).toBe('Milk')
})

test('task should be edited', () => {
    const todoListId1 = v1()
    const taskId = v1()

    const tasks: TasksType = ({
        [todoListId1]: [
            {
                id: taskId,
                title: 'Milk',
                completed: true,
                status: 1,
                todoListId: todoListId1,
                deadline: '',
                description: '',
                priority: 0,
                order: 2,
                startDate: '',
                addedDate: ''
            },
        ]
    })

    const newTasks: TasksType = tasksReducer(tasks, editTaskAC(todoListId1, taskId, {title: 'hello world'}))

    expect(newTasks[todoListId1][0].title).toBe('hello world')
    expect(newTasks[todoListId1].length).toBe(1)
})
