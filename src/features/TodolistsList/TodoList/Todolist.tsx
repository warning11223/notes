import React, {FC, useEffect} from 'react';
import {AddForm} from '../../../components/AddForm';
import {tasksThunks} from '../../../reducers/tasks/tasksSlice';
import s from './TodoList.module.scss';
import {useActions} from '../../../common/utils';
import {TodoListType} from '../../../reducers/todolist/todolistSlice';
import {TaskResponseType} from '../../../api/tasks.api';
import {FilterTasksButtons} from './FilterTasksButtons/FilterTasksButtons';
import Tasks from './Tasks/Tasks';
import TodolistTitle from './TodolistTitle/TodolistTitle';

type Props = {
    tasks: TaskResponseType[];
    todolist: TodoListType;
    demo?: boolean;
};

export const Todolist: FC<Props> = React.memo(({todolist, demo, tasks}) => {
    const {addTask} = useActions(tasksThunks);

    useEffect(() => {
        if (demo) {
            return;
        }
    }, []);

    const addTaskHandler = (title: string) => {
        return addTask({taskTitle: title, todolistID: todolist.id}).unwrap()
    }

    return (
        <div className={s.wrapper}>
            <TodolistTitle todolist={todolist}/>
            <AddForm
                placeholder="Add task"
                addTaskCallback={addTaskHandler}
                disabled={todolist.entityStatus === 'loading'}
            />
            <Tasks tasks={tasks} todolist={todolist}/>
            <div>
                <FilterTasksButtons todolist={todolist}/>
            </div>

            <div className={s.borderTop}></div>
            <div className={s.borderLeft}></div>
            <div className={s.borderRight}></div>
            <div className={s.borderBottomLeft}></div>
            <div className={s.borderBottomRight}></div>
        </div>
    );
});
