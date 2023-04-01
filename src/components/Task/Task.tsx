import React, {ChangeEvent, useCallback} from 'react';
import s from '../TodoList/TodoList.module.css';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {
    changeCheckedAC,
    changeCheckedTC,
    editTaskAC,
    editTaskTC,
    deleteTaskAC,
    deleteTaskTC
} from '../../reducers/tasksReducer';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {TaskResponseType, TaskStatuses} from '../../api/todolist-api';
import {useAppDispatch} from '../../hooks';

type TaskProps = {
    task: TaskResponseType
    todolistId: string
}

const Task: React.FC<TaskProps> = React.memo(({task, todolistId}) => {
    const dispatch = useAppDispatch();

    const editTaskHandler = useCallback((title: string) => {
        const properties = {
            title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        };

        dispatch(editTaskTC(todolistId, task.id, properties))
    }, [dispatch, todolistId, task.id])

    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(todolistId, task.id))
    }

    /*const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        callback(task.id, e.currentTarget.checked);
    }, [task.id])*/

    const changeCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 2 : 0;
        const properties = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        };

        dispatch(changeCheckedTC(todolistId, task.id, properties))
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
