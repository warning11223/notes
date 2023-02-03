import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddForm from './components/AddForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}


function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
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

    function removeTask(id: string, todoListId: string) {
        let filteredTasks = tasks[todoListId].filter(t => t.id !== id);
        tasks[todoListId] = filteredTasks
        setTasks({...tasks});
    }


    function addTask(title: string, todoListId: string) {
        const task = {id: v1(), title: title, isDone: false};
        const tasksItems = tasks[todoListId];
        const newItems = [...tasksItems, task];
        setTasks({...tasks, [todoListId]: newItems})

    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const list = todoLists.find(item => item.id === todoListId);
        if (list) {
            list.filter = value
            setTodoLists([...todoLists])
        }

    }

    function isChecked(id: string, checked: boolean, todoListId: string) {
        const task = tasks[todoListId].find(item => item.id === id)
        if (task) {
            task.isDone = checked
            setTasks({...tasks})
        }
    }

    function deleteTodoList(todoListId: string) {
        const list = todoLists.filter(item => item.id !== todoListId)
        setTodoLists(list)
    }

    function addTodoList(title: string) {
        const newTodolist: TodoListType = { id: v1(), title, filter: 'all'}
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function editTask(value: string, todoListId: string, taskId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(item => item.id === taskId ? {...item, title: value} : item)})
    }

    function editTitle(title: string, todoListId: string) {
        setTodoLists(todoLists.map(item => item.id === todoListId ? {...item, title} : item))
    }

    const todoListsRender = todoLists.map(item => {

        let tasksForTodolist = tasks[item.id];

        if (item.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        }
        if (item.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }

        return (
            <Todolist
                key={item.id}
                id={item.id}
                title={item.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                isChecked={isChecked}
                filter={item.filter}
                deleteTodoList={deleteTodoList}
                editTask={editTask}
                editTitle={editTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddForm addTaskCallback={addTodoList} />
            {todoListsRender}
        </div>
    );
}

export default App;
