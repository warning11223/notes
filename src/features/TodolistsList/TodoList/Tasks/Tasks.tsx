import React, {FC} from 'react';
import s from '../TodoList.module.scss';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {Task} from './Task';
import {TaskStatuses} from '../../../../api/api';
import {TaskResponseType} from '../../../../api/tasks.api';
import {TodoListType} from '../../../../reducers/todolist/todolistSlice';
import {useSelector} from 'react-redux';
import {selectStatus} from '../../../../reducers/error/errorSelectors';

type Props = {
    tasks: TaskResponseType[]
    todolist: TodoListType
}

const Tasks: FC<Props> = ({tasks, todolist}) => {
    const status = useSelector(selectStatus);

    let tasksForTodolist = tasks;

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(
            (t) => t.status === TaskStatuses.New
        );
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(
            (t) => t.status === TaskStatuses.Completed
        );
    }

    const filteredTasks = tasksForTodolist.map((t) => {
        return (
            <Task
                key={t.id}
                task={t}
                todolistId={todolist.id}
                todolistEntityStatus={todolist.entityStatus}
            />
        );
    });

    return (
        <ul className={s.ul}>
            {!tasks.length && (
                <div style={{margin: '0 auto'}}>No tasks ☹️</div>
            )}
            {status === 'loadingTasks' ? (
                <CircularProgress color="warning"/>
            ) : (
                filteredTasks
            )}
        </ul>
    );
};

export default Tasks;
