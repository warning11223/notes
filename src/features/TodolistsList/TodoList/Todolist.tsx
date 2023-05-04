import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from '../../../app/App';
import AddForm from '../../../components/AddForm/AddForm';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton/IconButton';
import Task from './Task/Task';
import FilterButton from '../../../components/FilterButton/FilterButton';
import {changeFilterAC, todolistThunks, TodoListType} from '../../../reducers/todolistReducer';
import {useAppDispatch} from '../../../app/hooks';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {useSelector} from 'react-redux';
import {TaskResponseType, TaskStatuses} from '../../../api/todolist-api';

import s from './TodoList.module.css';
import {selectStatus} from '../../../selectors/errorSelectors';
import {tasksThunks} from '../../../reducers/tasksReducer';

type PropsType = {
    tasks: TaskResponseType[]
    todolist: TodoListType
    demo?: boolean
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useAppDispatch();
    const status = useSelector(selectStatus)

    useEffect(() => {
        if (props.demo) {
            return
        }
    }, [])

    const editTodolistHandler = useCallback((title: string) => {
        dispatch(todolistThunks.editTodolist({todolistID: props.todolist.id, title}))
    }, [dispatch, props.todolist.id])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(tasksThunks.addTask({taskTitle: title, todolistID: props.todolist.id}))
    }, [dispatch, props.todolist.id])

    const removeTodolistHandler = useCallback(() => {
        dispatch(todolistThunks.removeTodolist({todolistID: props.todolist.id}))
    }, [dispatch, props.todolist.id])

    const changeFilterHandler = (filter: FilterValuesType) => {
        dispatch(changeFilterAC({todolistID: props.todolist.id, filter}))
    }

    const filterAll = useCallback(() => changeFilterHandler('all'), []);
    const filterActive = useCallback(() => changeFilterHandler('active'), []);
    const filterCompleted = useCallback(() => changeFilterHandler('completed'), []);

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    const filteredTasks = tasksForTodolist.map(t => {
        return <Task key={t.id} task={t} todolistId={props.todolist.id}
                     todolistEntityStatus={props.todolist.entityStatus}/>
    })

    return <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    }}>
        <div className={s.titleContainer}>
            <h3>
                <EditableSpan editCallback={editTodolistHandler}>{props.todolist.title}</EditableSpan>
            </h3>
            <IconButton color="error" onClick={removeTodolistHandler}
                        disabled={props.todolist.entityStatus === 'loading'}>
                <DeleteIcon
                    style={{cursor: 'pointer'}}
                    fontSize="medium"
                />
            </IconButton>
        </div>

        <AddForm placeholder="Add task" addTaskCallback={addTaskHandler}
                 disabled={props.todolist.entityStatus === 'loading'}/>

        <ul className={s.ul}>
            {
                status === 'loadingTasks' ? <CircularProgress color="warning"/> : filteredTasks
            }
        </ul>
        <div>
            <FilterButton
                changeFilterHandler={filterAll}
                color={props.todolist.filter === 'all' ? 'warning' : 'warning'}
                variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
            >All</FilterButton>
            <FilterButton
                changeFilterHandler={filterActive}
                color={props.todolist.filter === 'active' ? 'warning' : 'warning'}
                variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
            >Active</FilterButton>
            <FilterButton
                changeFilterHandler={filterCompleted}
                color={props.todolist.filter === 'completed' ? 'warning' : 'warning'}
                variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
            >Completed</FilterButton>
        </div>
    </div>
})
