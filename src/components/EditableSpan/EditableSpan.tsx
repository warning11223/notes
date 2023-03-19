import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type PropsType = {
    children: React.ReactNode
    editCallback: (value: string) => void
}

const EditableSpan: React.FC<PropsType> = React.memo(({children, editCallback}) => {
    console.log('EditableSpan')
    const [editable, setEditable] = useState(false);
    const [valueInput, setValueInput] = useState('');

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value);
    }

    const doubleClickHandler = () => {
        setEditable(true);
        children ? setValueInput(children.toString()) : setValueInput('');
    }

    const onBlurHandler = () => {
        setEditable(false);
        setValueInput(valueInput);
        editCallback(valueInput);
    }

    return (
        editable ? <TextField
            variant="standard"
            color="warning"
            type="text"
            value={valueInput}
            onChange={changeInputHandler}
            onBlur={onBlurHandler}
            autoFocus
        /> : <span onDoubleClick={doubleClickHandler}>{children}</span>
    )
})

export default EditableSpan;
