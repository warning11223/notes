import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/TodolistsList/TodoList/Todolist';

import AddForm from '../components/AddForm/AddForm';
import createTheme from '@mui/material/styles/createTheme';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {ThemeProvider} from '@mui/material/styles';
import Container from '@mui/material/Container/Container';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';

import {createTodolistTC, getTodolistsTC} from '../reducers/todolistReducer';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {useAppDispatch, useAppSelector} from './hooks';

export type FilterValuesType = 'all' | 'active' | 'completed';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#ffa726'
        },
        info: {
            main: '#ffffff'
        }
    },
});

const App = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ButtonAppBar/>
            </ThemeProvider>

            <Container maxWidth="lg">

            </Container>
        </div>
    );
}

const TodolistsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const todolists = useAppSelector((state: RootState) => state.todolistReducer);
    const tasks = useSelector((state: RootState) => state.tasksReducer);

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, [dispatch])

    const todoListsRender = todolists.map(item => {
        const allTodolistTasks = tasks[item.id];

        return (
            <Grid item xs={3.5} key={item.id}>
                <Paper elevation={3}>
                    <Todolist
                        id={item.id}
                        title={item.title}
                        filter={item.filter}
                        tasks={allTodolistTasks}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <>
            <Grid container style={{padding: '20px 0px 20px 0px'}}>
                <AddForm placeholder="Add todolist" addTaskCallback={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoListsRender}
            </Grid>
        </>
    )
}

export default App;
