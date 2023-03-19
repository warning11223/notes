import React, {ChangeEvent, useCallback} from 'react';
import s from '../TodoList/TodoList.module.css';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {changeCheckedAC, editTaskAC, removeTaskAC} from '../../reducers/tasksReducer';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../../App';
import {useDispatch} from 'react-redux';

type TaskProps = {
    task: TaskType
    todolistId: string
}

const Task: React.FC<TaskProps> = React.memo(({task, todolistId}) => {
    const dispatch = useDispatch();

    const editTaskHandler = useCallback((title: string) => {
        dispatch(editTaskAC(todolistId, task.id, title));
    }, [dispatch, todolistId, task.id])

    /*const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        callback(task.id, e.currentTarget.checked);
    }, [task.id])*/

    const changeCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCheckedAC(todolistId, task.id, e.currentTarget.checked));
    }, [dispatch,todolistId, task.id])


    return (
        <li key={task.id} className={`${s.listCheckboxes} ${task.isDone ? s.isDone : ''}`}>
            <Checkbox
                checked={task.isDone}
                onChange={changeCheckedHandler}
                size="medium"
                color="warning"
            />
            {/*<input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />*/}
            {/*<CheckBoxOutlineBlankIcon type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}></CheckBoxOutlineBlankIcon>*/}
            <EditableSpan
                editCallback={editTaskHandler}>{task.title}</EditableSpan>
            <IconButton color="error" onClick={() => dispatch(removeTaskAC(todolistId, task.id))}>
                <DeleteIcon
                    style={{cursor: 'pointer'}}
                    color="error"
                    fontSize="medium"
                />
            </IconButton>
        </li>
    );
})

export default Task;
