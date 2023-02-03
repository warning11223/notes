import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddForm from './components/AddForm';
import EditableSpan from './components/EditableSpan';

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

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan editCallback={editTitle}>{props.title}</EditableSpan>
            <button onClick={() => props.deleteTodoList(props.id)}>X</button>
        </h3>

        <AddForm addTaskCallback={addTask} />

        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.isChecked(t.id, event.currentTarget.checked, props.id)
                    }

                    const editTaskCallback = (title: string) => {
                        props.editTask(title, props.id, t.id)
                    }

                    return <li key={t.id} className={`${t.isDone ? 'is-done' : ''}`}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan editCallback={editTaskCallback}>{t.title}</EditableSpan>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={`${props.filter === 'all' ? 'active-filter' : ''}`} onClick={ onAllClickHandler }>All</button>
            <button className={`${props.filter === 'active' ? 'active-filter' : ''}`} onClick={ onActiveClickHandler }>Active</button>
            <button className={`${props.filter === 'completed' ? 'active-filter' : ''}`} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
