import React, {FC} from 'react';
import {FilterButton} from '../../../../components/FilterButton';
import {FilterValuesType} from '../../../../app/App';
import {useActions} from '../../../../common/utils';
import {todolistFunctions} from '../../../../reducers/todolist';
import {TodoListType} from '../../../../reducers/todolist/todolistSlice';

type Props = {
    todolist: TodoListType
}

export const FilterTasksButtons: FC<Props> = ({todolist}) => {
    const {changeFilter} = useActions(todolistFunctions);

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeFilter({filter, todolistID: todolist.id})
    }

    return (
        <>
            <FilterButton
                changeFilterHandler={() => changeFilterHandler('all')}
                color={todolist.filter === 'all' ? 'warning' : 'warning'}
                variant={todolist.filter === 'all' ? 'contained' : 'text'}
            >
                All
            </FilterButton>
            <FilterButton
                changeFilterHandler={() => changeFilterHandler('active')}
                color={todolist.filter === 'active' ? 'warning' : 'warning'}
                variant={todolist.filter === 'active' ? 'contained' : 'text'}
            >
                Active
            </FilterButton>
            <FilterButton
                changeFilterHandler={() => changeFilterHandler('completed')}
                color={todolist.filter === 'completed' ? 'warning' : 'warning'}
                variant={todolist.filter === 'completed' ? 'contained' : 'text'}
            >
                Completed
            </FilterButton>
        </>
    );
};

