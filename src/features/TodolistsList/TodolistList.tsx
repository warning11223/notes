import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';
import {createTodolistTC, getTodolistsTC} from '../../reducers/todolistReducer';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {Todolist} from './TodoList/Todolist';
import AddForm from '../../components/AddForm/AddForm';
import {SneakBar} from '../SneakBar/SneackBar';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo}) => {
    const dispatch = useAppDispatch();
    const todolists = useAppSelector((state: RootState) => state.todolistReducer);
    const tasks = useSelector((state: RootState) => state.tasksReducer);

    useEffect(() => {
        if (demo) {
            return
        }

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
                        todolist={item}
                        tasks={allTodolistTasks}
                        demo={demo}
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
            <SneakBar />
        </>
    )
}
