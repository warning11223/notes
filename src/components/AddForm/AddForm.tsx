import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


import AddBoxIcon from '@mui/icons-material/AddBox';
import s from './AddForm.module.css'

import TextField from '@mui/material/TextField/TextField';
import IconButton from '@mui/material/IconButton/IconButton';


type PropsType = {
    addTaskCallback: (title: string) => void
    placeholder: string
    disabled?: boolean
}

const AddForm: React.FC<PropsType> = React.memo(({addTaskCallback, placeholder, disabled}) => {
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            addTaskCallback(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (e.charCode === 13 && title.trim() !== '') {
            addTask();
        }
        /*else {
            setError('Title is required')
        }*/
    }

    const onBlurHandler = () => {
        if (title.trim() === '') {
            setError('Title is required')
        }
    }

    return (
        <div>
            <div className={s.textContainer}>
                <TextField
                    size="small"
                    label={`${error ? 'Error' : `${placeholder}`}`}
                    variant="outlined"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    onBlur={onBlurHandler}
                    error={!!error}
                    className={`${error ? 'error' : ''}`}
                    helperText={error}
                    disabled={disabled}
                />
                <IconButton color='warning' onClick={addTask} disabled={disabled}>
                    <AddBoxIcon
                        fontSize='large'
                        style={{cursor: 'pointer'}}
                    />
                </IconButton>
            </div>
        </div>
    );
})

export default AddForm;
