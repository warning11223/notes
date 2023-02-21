import {v1} from 'uuid';
import {TasksType, TodoListType} from '../App';
import {addTaskAC, changeCheckedAC, editTaskAC, removeTaskAC, tasksReducer} from './tasksReducer';
import {addTodolistAC, removeTodolistAC} from './todolistReducer';

test('task should be removed from tasks', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = ({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bred', isDone: false},
        ]
    })

    const taskId = tasks[todoListId1][0].id;
    const newTasks = tasksReducer(tasks, removeTaskAC(todoListId1, taskId))

    expect(newTasks[todoListId1].length).toBe(4)
    expect(newTasks[todoListId1][0].title).toBe('JS')
})

test('task should be added to tasks', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = ({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bred', isDone: false},
        ]
    })

    const newTasks = tasksReducer(tasks, addTaskAC(todoListId2, 'NEW TASK'))

    expect(newTasks[todoListId2].length).toBe(3)
    expect(newTasks[todoListId2][newTasks[todoListId2].length - 1].title).toBe('NEW TASK')
})


test('checked value should be changed to opposite', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = ({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bred', isDone: false},
        ]
    })
    const taskId = tasks[todoListId1][1].id;
    const newTasks = tasksReducer(tasks, changeCheckedAC(todoListId1, taskId, false))

    expect(newTasks[todoListId1].length).toBe(5)
    expect(newTasks[todoListId1][1].isDone).toBe(false)
})

test('title value of task should be edited', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = ({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bred', isDone: false},
        ]
    })
    const taskId = tasks[todoListId1][1].id;
    const newTasks = tasksReducer(tasks, editTaskAC(todoListId1, taskId, 'NEW VALUE'))

    expect(newTasks[todoListId1][1].title).toBe('NEW VALUE')
    expect(newTasks[todoListId1].length).toBe(5)
})

test('todolist should be removed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = ({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bred', isDone: false},
        ]
    })

    const newTasks = tasksReducer(tasks, removeTodolistAC(todoListId2))

    expect(newTasks[todoListId2]).toBeUndefined();
    expect(newTasks[todoListId1].length).toBe(5);
})

test('todolist should be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = ({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bred', isDone: false},
        ]
    })

    const newTodolist: TodoListType = {id: v1(), title: 'new todolist', filter: 'all'};
    const newTasks = tasksReducer(tasks, addTodolistAC( newTodolist))

    const keys = Object.keys(newTasks);
    const newKey = keys.find(item => item !== todoListId1 && item !== todoListId2);
    if (!newKey) throw  Error('new key should be added')


    expect(newTasks[newKey]).toEqual([])
})
