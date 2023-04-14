import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {action} from '@storybook/addon-actions';
import Task from '../features/TodolistsList/TodoList/Task/Task';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Task',
    component: Task,
    decorators: [
        ReduxStoreProviderDecorator
    ]
} as ComponentMeta<typeof Task>;

const changeTaskCheckbox = action('Checkbox changed')

export const TaskItemExample: ComponentStory<typeof Task> = () => (
    <>
        <Task todolistEntityStatus={'idle'} task={{ id: '1', title: 'task 1', completed: false, addedDate: '', todoListId: 'todoListId1', deadline: '', description: '', startDate: '', order: 0, status: 1, priority: 0 }} todolistId={'todoListId1'} />
        <Task todolistEntityStatus={'idle'} task={{ id: '2', title: 'task 2', completed: true, addedDate: '', todoListId: 'todoListId1', deadline: '', description: '', startDate: '', order: 0, status: 1, priority: 0 }} todolistId={'todoListId1'} />
    </>
);
