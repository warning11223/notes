import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import AddForm from '../AddForm/AddForm';
import EditableSpan from '../EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

import s from './TodoList.module.css'
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    isChecked: (id: string, checked: boolean, todoListId: string) => void
    filter: FilterValuesType
    id: string
    deleteTodoList: (todoListId: string) => void
    editTask: (value: string, id: string, taskId: string) => void
    editTitle: (title: string, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const editTitle = (value: string) => {
        props.editTitle(value, props.id)
    }

    return <div style={{padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
        <div className={s.titleContainer}>
            <h3><EditableSpan editCallback={editTitle}>{props.title}</EditableSpan></h3>
            <IconButton color='error' onClick={() => props.deleteTodoList(props.id)}>
                <DeleteIcon
                    style={{cursor: 'pointer'}}
                    color='error'
                    fontSize='medium'
                />
            </IconButton>
        </div>

        <AddForm placeholder='Add task' addTaskCallback={addTask} />

        <ul className={s.ul}>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.isChecked(t.id, event.currentTarget.checked, props.id)
                    }

                    const editTaskCallback = (title: string) => {
                        props.editTask(title, props.id, t.id)
                    }

                    return <li key={t.id} className={`${s.listCheckboxes} ${t.isDone ? s.isDone : ''}`}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                            size='medium'
                            color='warning'
                        />
                        {/*<input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />*/}
                        {/*<CheckBoxOutlineBlankIcon type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}></CheckBoxOutlineBlankIcon>*/}
                        <EditableSpan editCallback={editTaskCallback}>{t.title}</EditableSpan>
                        <IconButton color='error' onClick={ onClickHandler }>
                            <DeleteIcon
                                style={{cursor: 'pointer'}}
                                color='error'
                                fontSize='medium'
                            />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                variant={`${props.filter === 'all' ? 'contained' : 'text'}`}
                size='small'
                color={`${props.filter === 'all' ? 'warning' : 'warning'}`}
                onClick={ onAllClickHandler }
            >All</Button>
            <Button
                variant={`${props.filter === 'active' ? 'contained' : 'text'}`}
                size='small'
                color={`${props.filter === 'active' ? 'warning' : 'warning'}`}
                onClick={ onActiveClickHandler }
            >Active</Button>
            <Button
                variant={`${props.filter === 'completed' ? 'contained' : 'text'}`}
                size='small'
                color={`${props.filter === 'completed' ? 'warning' : 'warning'}`}
                onClick={ onCompletedClickHandler }
            >Completed</Button>
        </div>
    </div>
}
