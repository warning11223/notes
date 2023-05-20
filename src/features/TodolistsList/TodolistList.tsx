import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {todolistThunks} from '../../reducers/todolist/todolistReducer';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {Todolist} from './TodoList/Todolist';
import AddForm from '../../components/AddForm/AddForm';
import {Navigate} from 'react-router-dom';
import {selectTodolists} from '../../selectors/todolistSelectors';
import {selectTasks} from '../../selectors/tasksSelectors';
import {selectIsLoggedIn} from '../../selectors/authSelectors';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo}) => {
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(selectTodolists);
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }

        dispatch(todolistThunks.getTodolists())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(todolistThunks.createTodolist(title));
    }, [dispatch])

    const todoListsRender = todolists.map(item => {
        const allTodolistTasks = tasks[item.id];

        return (
            <Grid item xs={3.5} key={item.id}>
                <Paper elevation={3}>
                    <Todolist
                        todolist={item}
                        tasks={allTodolistTasks}
                        demo={demo}
                    />
                </Paper>
            </Grid>
        )
    })

    const emptyTodolists = <Grid item xs={3.5} style={{margin: '0 auto'}}>
        <Paper elevation={3} style={{
            width: '400px',
            padding: '40px 20px',
            textAlign: 'center',
            fontSize: '30px',
            backgroundColor: '#ffa726',
            color: '#ffffff'
        }}>
            'Empty! Add new todolist'
        </Paper>
    </Grid>

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px 0px 20px 0px'}}>
                <AddForm placeholder="Add todolist" addTaskCallback={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {
                    !todolists.length ? emptyTodolists : todoListsRender
                }
            </Grid>
        </>
    )
}
