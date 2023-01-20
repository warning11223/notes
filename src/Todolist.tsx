import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    isChecked: (id: string, checked: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && title.trim() !== '') {
            addTask();
        } else {
            setError('Title is required')
        }
    }

    const onBlurHandler = () => {
        if (title.trim() === '') {
            setError('Title is required')
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   onBlur={ onBlurHandler }
                   className={`${error ? 'error' : ''}`}
            />
            <button onClick={addTask}>+</button>
            <div className='error-message'>{error}</div>

        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.isChecked(t.id, event.currentTarget.checked)
                    }

                    return <li key={t.id} className={`${t.isDone ? 'is-done' : ''}`}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
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
