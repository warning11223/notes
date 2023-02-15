import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


import AddBoxIcon from '@mui/icons-material/AddBox';
import s from './AddForm.module.css'

import TextField from '@mui/material/TextField/TextField';
import IconButton from '@mui/material/IconButton/IconButton';


type PropsType = {
    addTaskCallback: (title: string) => void
    placeholder: string
}

const AddForm: React.FC<PropsType> = ({addTaskCallback, placeholder}) => {
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            addTaskCallback(title.trim());
            setTitle('');
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
                />
                <IconButton color='warning' onClick={addTask}>
                    <AddBoxIcon
                        fontSize='large'
                        color='warning'
                        style={{cursor: 'pointer'}}
                    />
                </IconButton>
               {/* <div className="error-message">{error}</div>*/}
            </div>
        </div>
    );
};

export default AddForm;
