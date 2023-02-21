import React from 'react';
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

import {addTodolistAC} from './reducers/todolistReducer';
import {addInitialAC} from './reducers/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './redux/store';

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
        secondary: {
            main: '#ffa726'
        },
        info: {
            main: '#ffffff'
        }
    },
});

function App() {
    const dispatch = useDispatch();
    const todolists = useSelector((state: RootState) => state.todolistReducer);

    function addTodoList(title: string) {
        const newTodolist: TodoListType = {id: v1(), title, filter: 'all'};

        dispatch(addTodolistAC(newTodolist));
        dispatch(addInitialAC(newTodolist.id));
    }

    const todoListsRender = todolists.map(item => {

        return (
            <Grid item xs={3.5} key={item.id}>
                <Paper elevation={3}>
                    <Todolist
                        id={item.id}
                        title={item.title}
                        filter={item.filter}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ButtonAppBar/>
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
