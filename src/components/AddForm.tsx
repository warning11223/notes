import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addTaskCallback: (title: string) => void
}

const AddForm: React.FC<PropsType> = ({addTaskCallback}) => {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            addTaskCallback(title.trim());
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


    return (
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
    );
};

export default AddForm;
