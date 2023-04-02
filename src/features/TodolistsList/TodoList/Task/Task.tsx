import React, {ChangeEvent, useCallback} from 'react';
import s from '../TodoList.module.css';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {deleteTaskTC, editTaskTC} from '../../../../reducers/tasksReducer';
import EditableSpan from '../../../../components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskResponseType, TaskStatuses} from '../../../../api/todolist-api';
import {useAppDispatch} from '../../../../app/hooks';

type TaskProps = {
    task: TaskResponseType
    todolistId: string
}

const Task: React.FC<TaskProps> = React.memo(({task, todolistId}) => {
    const dispatch = useAppDispatch();

    const editTaskHandler = useCallback((title: string) => {
        dispatch(editTaskTC(todolistId, task.id, {title}))
    }, [dispatch, todolistId, task.id])

    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(todolistId, task.id))
    }

    /*const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        callback(task.id, e.currentTarget.checked);
    }, [task.id])*/

    const changeCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 2 : 0;

        dispatch(editTaskTC(todolistId, task.id, {status}))
    }, [dispatch,todolistId, task.id])

    return (
        <li key={task.id} className={`${s.listCheckboxes} ${task.status === TaskStatuses.Completed ? s.isDone : ''}`}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeCheckedHandler}
                size="medium"
                color="warning"
            />
            {/*<input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />*/}
            {/*<CheckBoxOutlineBlankIcon type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}></CheckBoxOutlineBlankIcon>*/}
            <EditableSpan
                editCallback={editTaskHandler}>{task.title}</EditableSpan>
            <IconButton color="error" onClick={deleteTaskHandler}>
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
