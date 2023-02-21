import React from 'react';
import {FilterValuesType} from '../../App';
import AddForm from '../AddForm/AddForm';
import EditableSpan from '../EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

import s from './TodoList.module.css'
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {addTaskAC, changeCheckedAC, editTaskAC, removeTaskAC} from '../../reducers/tasksReducer';
import {changeFilterAC, editTodolistAC, removeTodolistAC} from '../../reducers/todolistReducer';

type PropsType = {
    title: string
    filter: FilterValuesType
    id: string
}

export function Todolist(props: PropsType) {

    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasksReducer)

    /*function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(todoListId, id));
    }

    function addTask(title: string) {
        dispatch(addTaskAC(props.id, title));
    }

    function changeFilter(value: FilterValuesType) {
        dispatch(changeFilterAC(props.id, value));
    }

    function isChecked(id: string, checked: boolean, todoListId: string) {
        dispatch(changeCheckedAC(todoListId, id, checked));
    }

    function deleteTodoList(todoListId: string) {
        dispatch(removeTodolistAC(todoListId));
    }

    function editTask(value: string, todoListId: string, taskId: string) {
        dispatch(editTaskAC(todoListId, taskId, value));
    }

    function editTitle(title: string) {
        dispatch(editTodolistAC(title, props.id));
    }*/

    let tasksForTodolist = tasks[props.id];

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }

    return <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    }}>
        <div className={s.titleContainer}>
            <h3><EditableSpan
                editCallback={(title: string) => dispatch(editTodolistAC(title, props.id))}>{props.title}</EditableSpan>
            </h3>
            <IconButton color="error" onClick={() => dispatch(removeTodolistAC(props.id))}>
                <DeleteIcon
                    style={{cursor: 'pointer'}}
                    color="error"
                    fontSize="medium"
                />
            </IconButton>
        </div>

        <AddForm placeholder="Add task" addTaskCallback={(title: string) => dispatch(addTaskAC(props.id, title))}/>

        <ul className={s.ul}>
            {
                tasksForTodolist.map(t => {

                    return <li key={t.id} className={`${s.listCheckboxes} ${t.isDone ? s.isDone : ''}`}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={(e) => dispatch(changeCheckedAC(props.id, t.id, e.currentTarget.checked))}
                            size="medium"
                            color="warning"
                        />
                        {/*<input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />*/}
                        {/*<CheckBoxOutlineBlankIcon type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}></CheckBoxOutlineBlankIcon>*/}
                        <EditableSpan
                            editCallback={(title: string) => dispatch(editTaskAC(props.id, t.id, title))}>{t.title}</EditableSpan>
                        <IconButton color="error" onClick={() => dispatch(removeTaskAC(props.id, t.id))}>
                            <DeleteIcon
                                style={{cursor: 'pointer'}}
                                color="error"
                                fontSize="medium"
                            />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                variant={`${props.filter === 'all' ? 'contained' : 'text'}`}
                size="small"
                color={`${props.filter === 'all' ? 'warning' : 'warning'}`}
                onClick={() => dispatch(changeFilterAC(props.id, 'all'))}
            >All</Button>
            <Button
                variant={`${props.filter === 'active' ? 'contained' : 'text'}`}
                size="small"
                color={`${props.filter === 'active' ? 'warning' : 'warning'}`}
                onClick={() => dispatch(changeFilterAC(props.id, 'active'))}
            >Active</Button>
            <Button
                variant={`${props.filter === 'completed' ? 'contained' : 'text'}`}
                size="small"
                color={`${props.filter === 'completed' ? 'warning' : 'warning'}`}
                onClick={() => dispatch(changeFilterAC(props.id, 'completed'))}
            >Completed</Button>
        </div>
    </div>
}
