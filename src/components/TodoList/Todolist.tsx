import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import AddForm from '../AddForm/AddForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

import s from './TodoList.module.css'
import IconButton from '@mui/material/IconButton/IconButton';
import {useDispatch} from 'react-redux';
import {addTaskAC} from '../../reducers/tasksReducer';
import {changeFilterAC, editTodolistAC, removeTodolistAC} from '../../reducers/todolistReducer';
import Task from '../Task/Task';
import FilterButton from '../FilterButton/FilterButton';

type PropsType = {
    title: string
    filter: FilterValuesType
    id: string
    tasks: TaskType[]
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist')
    const dispatch = useDispatch();


    const editTodolistHandler = useCallback((title: string) => {
        dispatch(editTodolistAC(title, props.id))
    }, [dispatch, props.id])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [dispatch, props.id])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(props.id))
    }, [dispatch, props.id])

    const changeFilterHandler = (filter: FilterValuesType) => {
        dispatch(changeFilterAC(props.id, filter))
    }

    const filterAll = useCallback(() => changeFilterHandler('all'), []);
    const filterActive = useCallback(() => changeFilterHandler('active'), []);
    const filterCompleted = useCallback(() => changeFilterHandler('completed'), []);

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    return <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    }}>
        <div className={s.titleContainer}>
            <h3>
                <EditableSpan editCallback={editTodolistHandler}>{props.title}</EditableSpan>
            </h3>
            <IconButton color="error" onClick={removeTodolistHandler}>
                <DeleteIcon
                    style={{cursor: 'pointer'}}
                    color="error"
                    fontSize="medium"
                />
            </IconButton>
        </div>

        <AddForm placeholder="Add task" addTaskCallback={addTaskHandler}/>

        <ul className={s.ul}>
            {
                tasksForTodolist.map(t => {
                    return <Task key={t.id} task={t} todolistId={props.id}/>
                })
            }
        </ul>
        <div>
            <FilterButton
                changeFilterHandler={filterAll}
                color={props.filter === 'all' ? 'warning' : 'warning'}
                variant={props.filter === 'all' ? 'contained' : 'text'}
            >All</FilterButton>
            <FilterButton
                changeFilterHandler={filterActive}
                color={props.filter === 'active' ? 'warning' : 'warning'}
                variant={props.filter === 'active' ? 'contained' : 'text'}
            >Active</FilterButton>
            <FilterButton
                changeFilterHandler={filterCompleted}
                color={props.filter === 'completed' ? 'warning' : 'warning'}
                variant={props.filter === 'completed' ? 'contained' : 'text'}
            >Completed</FilterButton>
        </div>
    </div>
})
