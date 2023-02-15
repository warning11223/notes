import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';

import AddForm from './components/AddForm/AddForm';
import createTheme from '@mui/material/styles/createTheme';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {ThemeProvider} from '@mui/material/styles';
import Container from '@mui/material/Container/Container';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import {
    addTodolistAC,
    changeFilterAC,
    editTodolistAC,
    removeTodolistAC,
    todolistReducer
} from './reducers/todolistReducer';
import {
    addInitialAC,
    addTaskAC,
    changeCheckedAC,
    editTaskAC,
    removeTaskAC,
    tasksReducer
} from './reducers/tasksReducer';

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

const theme = createTheme({
    palette: {
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        secondary: {
            main: '#ffa726'
        },
        info: {
            main: '#ffffff'
        }
    },
});

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todolists, dispatchTodolist] = useReducer(todolistReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        /*let filteredTasks = tasks[todoListId].filter(t => t.id !== id);
        tasks[todoListId] = filteredTasks
        setTasks({...tasks});*/
        dispatchTasks(removeTaskAC(todoListId, id));
    }

    function addTask(title: string, todoListId: string) {
        /*const task = {id: v1(), title: title, isDone: false};
        const tasksItems = tasks[todoListId];
        const newItems = [...tasksItems, task];
        setTasks({...tasks, [todoListId]: newItems})*/
        dispatchTasks(addTaskAC(todoListId, title));
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        /*const list = todolists.find(item => item.id === todoListId);
        if (list) {
            list.filter = value
            setTodoLists([...todoLists])
        }*/
        dispatchTodolist(changeFilterAC(todoListId, value));
    }

    function isChecked(id: string, checked: boolean, todoListId: string) {
        /*const task = tasks[todoListId].find(item => item.id === id)
        if (task) {
            task.isDone = checked
            setTasks({...tasks})
        }*/
        dispatchTasks(changeCheckedAC(todoListId, id, checked));
    }

    function deleteTodoList(todoListId: string) {
        /*const list = todoLists.filter(item => item.id !== todoListId)
        setTodoLists(list)*/
        dispatchTodolist(removeTodolistAC(todoListId));
    }

    function addTodoList(title: string) {
        /*setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})*/
        const newTodolist: TodoListType = {id: v1(), title, filter: 'all'};

        dispatchTodolist(addTodolistAC(newTodolist, title));
        dispatchTasks(addInitialAC(newTodolist.id))
    }

    function editTask(value: string, todoListId: string, taskId: string) {
        /*setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(item => item.id === taskId ? {...item, title: value} : item)
        })*/
        dispatchTasks(editTaskAC(todoListId, taskId, value));
    }

    function editTitle(title: string, todoListId: string) {
        /*setTodoLists(todoLists.map(item => item.id === todoListId ? {...item, title} : item))*/
        dispatchTodolist(editTodolistAC(title, todoListId))
    }

    const todoListsRender = todolists.map(item => {

        let tasksForTodolist = tasks[item.id];

        if (item.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        }
        if (item.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }

        return (
            <Grid item xs={3.5} key={item.id}>
                <Paper elevation={3}>
                    <Todolist
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
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ButtonAppBar />
            </ThemeProvider>

            <Container maxWidth="lg">
                <Grid container style={{padding: '20px 0px 20px 0px'}}>
                    <AddForm placeholder="Add todolist" addTaskCallback={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsRender}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
