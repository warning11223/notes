import React, {FC} from 'react';
import s from '../TodoList.module.scss';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from '../../../../components/EditableSpan';
import {useActions} from '../../../../common/utils';
import {todolistFunctions} from '../../../../reducers/todolist';
import {TodoListType} from '../../../../reducers/todolist/todolistSlice';

type Props = {
    todolist: TodoListType
}

const TodolistTitle: FC<Props> = ({todolist}) => {
    const {editTodolist, removeTodolist} = useActions(todolistFunctions);

    const editTodolistHandler = (title: string) => {
        editTodolist({todolistID: todolist.id, title});
    }

    const removeTodolistHandler = () => {
        removeTodolist({todolistID: todolist.id});
    }

    return (
        <div className={s.titleContainer}>
            <IconButton
                color="error"
                onClick={removeTodolistHandler}
                disabled={todolist.entityStatus === 'loading'}
                style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '-2px',
                    right: '-4px',
                }}
            >
                <DeleteIcon fontSize="medium"/>
            </IconButton>
            <h3 className={s.title}>
                <EditableSpan editCallback={editTodolistHandler}>
                    {todolist.title}
                </EditableSpan>
            </h3>
        </div>
    );
};

export default TodolistTitle;
