import React, {ChangeEvent, useCallback} from 'react';
import s from '../TodoList.module.css';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {tasksThunks} from '../../../../reducers/tasks/tasksReducer';
import {EditableSpan} from '../../../../components/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskResponseType, TaskStatuses} from '../../../../api/todolist-api';
import {StatusTypes} from '../../../../reducers/error/errorReducer';
import {useActions} from '../../../../common/utils';

type TaskProps = {
    task: TaskResponseType
    todolistId: string
    todolistEntityStatus: StatusTypes
}

export const Task: React.FC<TaskProps> = React.memo(({task, todolistId, todolistEntityStatus}) => {
    const {editTask, deleteTask} = useActions(tasksThunks)

    const editTaskHandler = useCallback((title: string) => {
        editTask({taskID: task.id, taskModel: {title}, todolistID: todolistId})
    }, [todolistId, task.id])

    const deleteTaskHandler = () => {
        deleteTask({taskID: task.id, todolistID: todolistId})
    }

    /*const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        callback(task.id, e.currentTarget.checked);
    }, [task.id])*/

    const changeCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 2 : 0;

        dispatch(tasksThunks.editTask({taskID: task.id, taskModel: {status}, todolistID: todolistId}))
    }, [dispatch, todolistId, task.id])

    return (
        <li key={task.id} className={`${s.listCheckboxes} ${task.status === TaskStatuses.Completed ? s.isDone : ''}`}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeCheckedHandler}
                size="medium"
                color="warning"
                disabled={todolistEntityStatus === 'loading'}
            />
            {/*<input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />*/}
            {/*<CheckBoxOutlineBlankIcon type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}></CheckBoxOutlineBlankIcon>*/}
            <EditableSpan editCallback={editTaskHandler} >{task.title}</EditableSpan>
            <IconButton
                color="error"
                onClick={deleteTaskHandler}
                disabled={todolistEntityStatus === 'loading'}
                className={s.deleteItemBtn}
                size={"small"}
            >
                <DeleteIcon style={{cursor: 'pointer'}} fontSize="small"/>
            </IconButton>
        </li>
    );
})
